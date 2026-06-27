"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const videos = [
  "/videos/1.mp4",
  "/videos/2.mp4",
  "/videos/3.mp4",
  "/videos/4.mp4",
  "/videos/5.mp4",
  "/videos/6.mp4",
  "/videos/7.mp4",
  "/videos/8.mp4",
];

export default function Gallery() {
  // Index de l'unique vidéo dont le son est activé (null = toutes muettes)
  const [soundIndex, setSoundIndex] = useState<number | null>(null);

  return (
    <section
      id="galerie"
      className="relative overflow-hidden bg-beige py-28 sm:py-36"
    >
      <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="kicker text-xs text-gold mb-5">En vidéo</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] max-w-xl text-balance">
            Le Cristal, en mouvement
          </h2>
        </Reveal>
      </div>

      {/* Bandeau vidéo en défilement continu (gauche → droite) */}
      <div className="relative">
        <div className="flex w-max animate-marquee-reverse">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {videos.map((src, i) => {
                const hasSound = dup === 0 && soundIndex === i;
                return (
                  <div
                    key={i}
                    className="group/card relative mr-4 aspect-[9/16] w-[60vw] max-w-[280px] shrink-0 overflow-hidden rounded-2xl bg-ink sm:mr-5 sm:w-[260px] lg:w-[300px]"
                  >
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted={!hasSound}
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={src} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />

                    {/* Unique contrôle : activer / couper le son de cette vidéo */}
                    {dup === 0 && (
                      <button
                        onClick={() =>
                          setSoundIndex(hasSound ? null : i)
                        }
                        aria-label={hasSound ? "Couper le son" : "Activer le son"}
                        className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-ink/55 text-cream backdrop-blur transition-colors hover:bg-ink/80"
                      >
                        {hasSound ? (
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM19 9.27l-1.4 1.4L19 12l-1.4 1.34L19 14.73l1.4-1.39L21.8 12 19 9.27z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Dégradés latéraux pour un fondu propre */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-beige to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-beige to-transparent sm:w-28" />
      </div>
    </section>
  );
}
