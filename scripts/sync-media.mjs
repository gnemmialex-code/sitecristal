// Récupère les médias du bucket Supabase PRIVÉ « videos & images », les
// compresse et les dépose dans public/media/. Le site sert ensuite ces fichiers
// lui-même : les visites ne consomment plus aucun egress Supabase.
//
//   npm run media:sync
//
// Prérequis : ffmpeg dans le PATH, et dans .env.local :
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY
//
// Les téléchargements sont mis en cache dans .media-cache/ : relancer le script
// ne retélécharge que les fichiers modifiés dans le bucket.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const BUCKET = "videos & images";
const IMAGE_DIR = "IMAGE";
const VIDEO_DIR = "VIDEO";

// Noms lisibles pour les photos exportées d'Instagram.
// Une photo absente de cette liste garde son nom d'origine (nettoyé).
const PHOTO_NAMES = {
  "SnapInsta.to_721601500_18094419104606629_5454987708561617259_n.jpg": "devanture",
  "SnapInsta.to_720387037_18094288070606629_7285563760158774753_n.jpg": "comptoir",
  "SnapInsta.to_723977001_18094419095606629_6846657153744740864_n.jpg": "comptoir-formules",
  "SnapInsta.to_721387001_18094288118606629_6790193876863480045_n.jpg": "neon",
  "SnapInsta.to_721642555_18094019849606629_8828976030291203682_n.jpg": "chef-broche",
  "SnapInsta.to_723066877_18094419086606629_2212786478598060560_n.jpg": "chef-broche-2",
  "SnapInsta.to_721382785_18094019828606629_1494082564362745757_n.jpg": "broche-coupe",
  "SnapInsta.to_721382795_18094288079606629_4580529264797130710_n.jpg": "broche-gros-plan",
  "SnapInsta.to_721265741_18094019840606629_2130323623047440004_n.jpg": "crudites",
  "SnapInsta.to_721387155_18094019858606629_7720806147613129823_n.jpg": "harissa",
  "SnapInsta.to_721309211_18094019867606629_4186709616428199582_n.jpg": "client-frites",
  "SnapInsta.to_721575846_18094019876606629_665498228810309592_n.jpg": "client-sandwich",
  "SnapInsta.to_721387402_18094288106606629_6497021702896141868_n.jpg": "terrasse",
  "SnapInsta.to_719427026_18094288088606629_1928726843050638509_n.jpg": "livreur",
};

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, ".media-cache");
const OUT_PHOTOS = path.join(ROOT, "public", "media", "photos");
const OUT_VIDEOS = path.join(ROOT, "public", "media", "videos");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SECRET = process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SECRET) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SECRET_KEY doivent être définies dans .env.local",
  );
  process.exit(1);
}

const headers = { apikey: SECRET, Authorization: `Bearer ${SECRET}` };
const bucketPath = encodeURIComponent(BUCKET);

async function list(folder) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${bucketPath}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ prefix: `${folder}/`, limit: 1000 }),
  });
  if (!res.ok) throw new Error(`Liste ${folder} : ${res.status} ${await res.text()}`);
  // Les entrées sans id sont des sous-dossiers.
  return (await res.json()).filter((o) => o.id);
}

async function download(folder, file) {
  const dest = path.join(CACHE, folder, file.name);
  if (existsSync(dest) && statSync(dest).size === file.metadata?.size) return dest;

  mkdirSync(path.dirname(dest), { recursive: true });
  const url = `${SUPABASE_URL}/storage/v1/object/${bucketPath}/${folder}/${encodeURIComponent(file.name)}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Téléchargement ${file.name} : ${res.status}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`  ↓ ${folder}/${file.name}`);
  return dest;
}

/** Vrai si la sortie existe et est plus récente que la source. */
const upToDate = (src, out) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;

const ffmpeg = (args) => execFileSync("ffmpeg", ["-y", "-v", "error", ...args], { stdio: "inherit" });

const slug = (name) =>
  path
    .parse(name)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const kb = (file) => `${Math.round(statSync(file).size / 1024)} Ko`;

async function syncPhotos() {
  mkdirSync(OUT_PHOTOS, { recursive: true });
  for (const file of await list(IMAGE_DIR)) {
    const src = await download(IMAGE_DIR, file);
    const out = path.join(OUT_PHOTOS, `${PHOTO_NAMES[file.name] ?? slug(file.name)}.jpg`);
    if (upToDate(src, out)) continue;
    // 1200 px de large suffit : next/image génère ensuite les tailles plus petites.
    ffmpeg(["-i", src, "-vf", "scale='min(1200,iw)':-2", "-q:v", "4", out]);
    console.log(`  ✓ photos/${path.basename(out)} (${kb(out)})`);
  }
}

async function syncVideos() {
  mkdirSync(OUT_VIDEOS, { recursive: true });
  for (const file of await list(VIDEO_DIR)) {
    const src = await download(VIDEO_DIR, file);
    const name = slug(file.name);
    const out = path.join(OUT_VIDEOS, `${name}.mp4`);
    const poster = path.join(OUT_VIDEOS, `${name}.jpg`);

    if (!upToDate(src, out)) {
      // Vidéos verticales affichées au plus à ~340 px de large : 540×960 suffit.
      // Débit plafonné (~0,6 Mb/s) : c'est lui qui fixe la bande passante par visite.
      ffmpeg([
        "-i", src,
        "-vf", "scale=540:960:force_original_aspect_ratio=increase,crop=540:960",
        "-c:v", "libx264", "-preset", "slow", "-crf", "30",
        "-maxrate", "550k", "-bufsize", "1100k",
        "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "64k", "-ac", "2",
        "-movflags", "+faststart",
        out,
      ]);
      console.log(`  ✓ videos/${name}.mp4 (${kb(out)})`);
    }
    if (!upToDate(src, poster)) {
      // Image affichée tant que la vidéo n'est pas chargée.
      ffmpeg(["-ss", "0.5", "-i", out, "-frames:v", "1", "-q:v", "6", poster]);
    }
  }
}

console.log("Photos…");
await syncPhotos();
console.log("Vidéos…");
await syncVideos();
console.log("Terminé.");
