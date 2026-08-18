// 👉 Médias hébergés sur Supabase Storage (buckets publics « IMAGE » et « VIDEO »).
//    Seuls le logo et le film de présentation restent dans /public.

const base = process.env.NEXT_PUBLIC_MEDIA_URL;

if (!base) {
  throw new Error(
    "NEXT_PUBLIC_MEDIA_URL est manquante. Ajoutez-la dans .env.local en local, " +
      "et dans les variables d'environnement du projet Vercel pour la mise en ligne.",
  );
}

const root = base.replace(/\/$/, "");

/** Photo du bucket IMAGE — ex. mediaImage("1.jpg") */
export const mediaImage = (file: string) => `${root}/IMAGE/${file}`;

/** Vidéo du bucket VIDEO — ex. mediaVideo("1.mp4") */
export const mediaVideo = (file: string) => `${root}/VIDEO/${file}`;
