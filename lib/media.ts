// 👉 Les médias sont servis par le site lui-même depuis public/media/.
//    Source : bucket Supabase privé « videos & images » (dossiers IMAGE et
//    VIDEO), copié et compressé avec `npm run media:sync`. Aucun visiteur ne
//    télécharge donc depuis Supabase.

/** Photo de public/media/photos — ex. mediaImage("devanture") */
export const mediaImage = (name: string) => `/media/photos/${name}.jpg`;

/** Vidéo verticale de public/media/videos — ex. mediaVideo("1") */
export const mediaVideo = (name: string) => `/media/videos/${name}.mp4`;

/** Image d'attente d'une vidéo, générée par le script de synchro. */
export const mediaPoster = (name: string) => `/media/videos/${name}.jpg`;
