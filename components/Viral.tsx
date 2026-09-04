"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { mediaVideo } from "@/lib/media";

const CREDIT_HANDLE = "panameafaim";
const CREDIT_URL = `https://www.instagram.com/${CREDIT_HANDLE}/`;

export default function Viral() {
  // La vidéo démarre muette (autoplay navigateur), le son est activable au clic.
  const [sound, setSound] = useState(false);

  return (
    <section
      id="viral"
      className="relative overflow-hidden bg-charcoal py-24 text-cream sm:py-32"
    >
      {/* Déco : halo doré diffus + fines règles horizontales */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-[120px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-20">
        {/* Texte */}
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="kicker text-xs text-gold mb-5">Vu sur Instagram</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-balance sm:text-6xl">
              7,8 millions de vues.
              <span className="block italic text-gold">Un seul kebab.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-cream/70 sm:text-lg lg:mx-0">
              La vidéo qui a fait connaître Le Cristal 1981 bien au-delà de la
              rue de Mazagran.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:justify-start">
              <div className="border-l border-cream/20 pl-5 text-left">
                <p className="font-display text-3xl font-bold sm:text-4xl">7,8 M</p>
                <p className="mt-1 text-xs text-cream/50 sm:text-sm">
                  Vues sur Instagram
                </p>
              </div>
              <div className="border-l border-cream/20 pl-5 text-left">
                <a
                  href={CREDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-3xl font-bold transition-colors hover:text-gold sm:text-4xl"
                >
                  @{CREDIT_HANDLE}
                </a>
                <p className="mt-1 text-xs text-cream/50 sm:text-sm">
                  Vidéo réalisée par
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Vidéo */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto w-[min(78vw,300px)] sm:w-[340px]">
            {/* Cadre doré décalé */}
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] border border-gold/35 sm:-inset-4"
            />
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-ink shadow-2xl">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted={!sound}
                loop
                playsInline
                preload="metadata"
              >
                <source src={mediaVideo("20.mp4")} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-cream/10" />

              <button
                onClick={() => setSound((s) => !s)}
                aria-label={sound ? "Couper le son" : "Activer le son"}
                className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-ink/55 text-cream backdrop-blur transition-colors hover:bg-ink/80"
              >
                {sound ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM19 9.27l-1.4 1.4L19 12l-1.4 1.34L19 14.73l1.4-1.39L21.8 12 19 9.27z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Crédit sous la vidéo */}
            <a
              href={CREDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 text-xs text-cream/50 transition-colors hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 5.19a4.65 4.65 0 1 0 0 9.3 4.65 4.65 0 0 0 0-9.3zm0 7.67a3.02 3.02 0 1 1 0-6.04 3.02 3.02 0 0 1 0 6.04zm5.92-7.85a1.09 1.09 0 1 1-2.17 0 1.09 1.09 0 0 1 2.17 0z" />
              </svg>
              Vidéo par @{CREDIT_HANDLE} sur Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
