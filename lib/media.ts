// 👉 Médias hébergés sur Supabase Storage (bucket public « VIDEO-CRISTAL »,
//    dossiers « photo » et « video »). Seuls le logo et le film de
//    présentation restent dans /public.

const base = process.env.NEXT_PUBLIC_MEDIA_URL;

if (!base) {
  throw new Error(
    "NEXT_PUBLIC_MEDIA_URL est manquante. Ajoutez-la dans .env.local en local, " +
      "et dans les variables d'environnement du projet Vercel pour la mise en ligne.",
  );
}

const root = `${base.replace(/\/$/, "")}/VIDEO-CRISTAL`;

/** Photo du dossier photo/ — ex. mediaImage("1.jpg") */
export const mediaImage = (file: string) => `${root}/photo/${file}`;

/** Vidéo du dossier video/ — ex. mediaVideo("1.mp4") */
export const mediaVideo = (file: string) => `${root}/video/${file}`;
