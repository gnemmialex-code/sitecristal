Ce dossier ne contient plus que le film de présentation (interview.mp4),
trop volumineux pour être servi depuis Supabase.

Les vidéos verticales de la galerie (1.mp4 → 8.mp4) sont hébergées sur
Supabase Storage, dans le bucket public « VIDEO ».

  - Ajouter / remplacer une vidéo : Supabase → Storage → VIDEO → Upload.
  - Gardez la numérotation (1.mp4, 2.mp4, ...) : le code la génère
    automatiquement via lib/media.ts (mediaVideo).

Conseils :
  - MP4 (H.264 + AAC) pour une compatibilité maximale.
  - Galerie : ratio 9:16 (ex. 1080 x 1920).
  - Présentation : ratio 16:9 (ex. 1920 x 1080).
