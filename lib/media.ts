// 👉 Médias hébergés sur Supabase Storage (bucket public « VIDEO-CRISTAL »,
//    dossiers « photo » et « video »). Seuls le logo et le film de
//    présentation restent dans /public.

const BUCKET = "VIDEO-CRISTAL";

// Projet Supabase par défaut. Sert de filet quand aucune variable
// d'environnement n'est fournie (build d'aperçu, clone frais…), pour que le
// build n'échoue jamais sur une simple variable oubliée. Ces valeurs sont
// publiques : elles figurent déjà dans chaque URL d'image servie au navigateur.
const DEFAULT_SUPABASE_URL = "https://mejoyeftrfidswbereky.supabase.co";

const STORAGE_PATH = "/storage/v1/object/public";

function resolveBase() {
  const explicit = process.env.NEXT_PUBLIC_MEDIA_URL;
  if (explicit) return explicit;

  // NEXT_PUBLIC_MEDIA_URL n'est qu'un raccourci : on sait la reconstruire.
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (projectUrl) return `${projectUrl.replace(/\/$/, "")}${STORAGE_PATH}`;

  console.warn(
    "[media] NEXT_PUBLIC_MEDIA_URL et NEXT_PUBLIC_SUPABASE_URL sont absentes. " +
      "Repli sur le projet Supabase par défaut. Renseignez ces variables dans " +
      "les paramètres de votre hébergeur (Netlify : Site configuration → " +
      "Environment variables) pour maîtriser la source des médias.",
  );
  return `${DEFAULT_SUPABASE_URL}${STORAGE_PATH}`;
}

const root = `${resolveBase().replace(/\/$/, "")}/${BUCKET}`;

/** Photo du dossier photo/ — ex. mediaImage("1.jpg") */
export const mediaImage = (file: string) => `${root}/photo/${file}`;

/** Vidéo du dossier video/ — ex. mediaVideo("1.mp4") */
export const mediaVideo = (file: string) => `${root}/video/${file}`;
