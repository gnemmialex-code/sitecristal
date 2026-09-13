Ce dossier ne contient que le logo.

Les photos du site sont dans public/media/photos. Elles sont copiées et
compressées depuis le bucket Supabase privé « videos & images » (dossier IMAGE).

  - Ajouter / remplacer une photo : Supabase → Storage → videos & images →
    IMAGE → Upload, puis lancer `npm run media:sync` et committer.
  - Une nouvelle photo garde son nom d'origine, sauf si on lui donne un nom
    lisible dans PHOTO_NAMES (scripts/sync-media.mjs).
