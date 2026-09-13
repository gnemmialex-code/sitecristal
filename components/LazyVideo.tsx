"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  muted?: boolean;
  className?: string;
};

/**
 * Vidéo en boucle qui ne se télécharge et ne joue que lorsqu'elle est à
 * l'écran. Hors écran elle est mise en pause : on économise la bande passante
 * de l'hébergeur et la batterie des visiteurs.
 */
export default function LazyVideo({ src, poster, muted = true, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // React ne pose pas l'attribut muted de façon fiable : on le force ici,
  // sinon les navigateurs bloquent la lecture automatique.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = muted;
    if (!muted) video.play().catch(() => {});
  }, [muted]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "150px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
