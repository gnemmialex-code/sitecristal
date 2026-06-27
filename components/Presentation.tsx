"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

// iOS Safari n'expose le plein écran que sur l'élément <video> lui-même
interface FullscreenVideo extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

export default function Presentation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    setMuted(next);
  };

  const goFullscreen = () => {
    const frame = frameRef.current;
    const video = videoRef.current as FullscreenVideo | null;
    // Ordinateur (et Android) : plein écran sur le cadre pour garder les contrôles
    if (frame?.requestFullscreen) {
      frame.requestFullscreen().catch(() => {});
      return;
    }
    // iPhone / iPad : plein écran natif sur la vidéo
    video?.webkitEnterFullscreen?.();
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
          <div
            ref={frameRef}
            className="group relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-lg border border-ink/10 bg-charcoal shadow-[0_40px_120px_-50px_rgba(13,13,12,0.7)] sm:rounded-xl"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover [:fullscreen_&]:object-contain"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              {/* Film de présentation (format paysage 16:9) */}
              <source src="/videos/interview.mp4" type="video/mp4" />
            </video>

            {/* Libellé */}
            <div className="pointer-events-none absolute bottom-6 left-6 text-left">
              <span className="block font-display text-2xl font-semibold text-cream drop-shadow">
                Le Cristal 1981
              </span>
              <span className="block text-sm text-cream/70 drop-shadow">
                Film de présentation · 2 rue de Mazagran
              </span>
            </div>

            {/* Contrôles : son + plein écran */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <button
                onClick={toggleSound}
                aria-label={muted ? "Activer le son" : "Couper le son"}
                className="grid h-12 w-12 place-items-center rounded-full bg-cream/95 text-ink shadow-lg transition-transform duration-300 hover:scale-110"
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM19 9.27l-1.4 1.4L19 12l-1.4 1.34L19 14.73l1.4-1.39L21.8 12 19 9.27z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
                  </svg>
                )}
              </button>
              <button
                onClick={goFullscreen}
                aria-label="Afficher en plein écran"
                className="grid h-12 w-12 place-items-center rounded-full bg-cream/95 text-ink shadow-lg transition-transform duration-300 hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
