Ce dossier ne contient que le film de présentation (interview.mp4, 16:9).

Les vidéos verticales (1.mp4 → 11.mp4) sont dans public/media/videos. Elles sont
copiées et compressées (540 x 960) depuis le bucket Supabase privé
« videos & images » (dossier VIDEO), avec une image d'attente par vidéo.

  - Ajouter / remplacer une vidéo : Supabase → Storage → videos & images →
    VIDEO → Upload, puis lancer `npm run media:sync` et committer.
  - Gardez la numérotation (1.mp4, 2.mp4, ...).
