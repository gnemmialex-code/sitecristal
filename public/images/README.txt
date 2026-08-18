Ce dossier ne contient plus que le logo.

Les photos du site (1.jpg → 12.jpg) sont hébergées sur Supabase Storage,
dans le bucket public « IMAGE ».

  - Ajouter / remplacer une photo : Supabase → Storage → IMAGE → Upload.
  - Gardez la numérotation (1.jpg, 2.jpg, ...) : le code la génère
    automatiquement via lib/media.ts (mediaImage).

Conseils :
  - JPG, PNG ou WebP. Le WebP est le plus léger.
  - Paysage (ex. 1600 x 1200) ou carré (ex. 1200 x 1200).
