"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";

export default function Presentation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="presentation" className="relative bg-cream-soft py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-14">
          <Reveal>
            <p className="kicker text-xs text-gold mb-5">La maison en vidéo</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-balance">
              Poussez la porte du Cristal
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-ink/65">
              Une immersion complète : la braise, les gestes, l&apos;ambiance.
              Découvrez en images ce qui fait notre maison depuis 1981.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="group relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-[2rem] border border-ink/10 bg-charcoal shadow-[0_40px_120px_-50px_rgba(13,13,12,0.7)]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              controls={playing}
              poster=""
              preload="metadata"
            >
              {/* Déposez votre vidéo de présentation ici (format paysage 16:9) */}
              <source src="/videos/presentation.mp4" type="video/mp4" />
            </video>

            {/* Placeholder visuel tant qu'aucune vidéo n'est fournie */}
            {!playing && (
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(171,132,66,0.45),transparent_55%),linear-gradient(135deg,#1a1916,#0d0d0c)]" />
            )}

            {!playing && (
              <button
                onClick={toggle}
                aria-label="Lire la vidéo de présentation"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="pulse-ring relative grid h-20 w-20 place-items-center rounded-full bg-cream/95 text-ink transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="absolute bottom-6 left-6 text-left">
                  <span className="block font-display text-2xl font-semibold text-cream">
                    Le Cristal 1981
                  </span>
                  <span className="block text-sm text-cream/60">
                    Film de présentation · 2 rue de Mazagran
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-xs text-ink/45">
            Astuce : placez votre film dans{" "}
            <code className="rounded bg-ink/10 px-1.5 py-0.5">
              public/videos/presentation.mp4
            </code>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
