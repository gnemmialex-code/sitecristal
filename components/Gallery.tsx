"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const videos = [
  {
    title: "La braise",
    tag: "Cuisson au feu",
    src: "/videos/vertical-1.mp4",
    bg: "radial-gradient(circle at 35% 30%, rgba(171,132,66,0.55), transparent 60%), linear-gradient(160deg, #2a2620, #0d0d0c)",
  },
  {
    title: "Le geste",
    tag: "Découpe minute",
    src: "/videos/vertical-2.mp4",
    bg: "radial-gradient(circle at 65% 40%, rgba(239,227,205,0.3), transparent 55%), linear-gradient(160deg, #211e19, #14130f)",
  },
  {
    title: "Pain maison",
    tag: "Pétri chaque jour",
    src: "/videos/vertical-3.mp4",
    bg: "radial-gradient(circle at 40% 65%, rgba(194,160,99,0.45), transparent 55%), linear-gradient(160deg, #2a2620, #0d0d0c)",
  },
  {
    title: "L'assiette",
    tag: "Générosité",
    src: "/videos/vertical-4.mp4",
    bg: "radial-gradient(circle at 55% 35%, rgba(171,132,66,0.4), transparent 60%), linear-gradient(160deg, #1a1916, #14130f)",
  },
  {
    title: "Les sauces",
    tag: "Préparées le matin",
    src: "/videos/vertical-5.mp4",
    bg: "radial-gradient(circle at 45% 35%, rgba(194,160,99,0.5), transparent 58%), linear-gradient(160deg, #211e19, #0d0d0c)",
  },
  {
    title: "La salle",
    tag: "Ambiance 1981",
    src: "/videos/vertical-6.mp4",
    bg: "radial-gradient(circle at 60% 55%, rgba(171,132,66,0.35), transparent 60%), linear-gradient(160deg, #2a2620, #14130f)",
  },
];

export default function Gallery() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="galerie" className="relative bg-beige py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <p className="kicker text-xs text-gold mb-5">En vidéo</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] max-w-xl text-balance">
                L&apos;art du geste, à chaque service
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-6">
              <p className="max-w-xs text-ink/65">
                Des formats verticaux, comme en story. Faites défiler.
              </p>
              <div className="hidden shrink-0 gap-2 sm:flex">
                <button
                  aria-label="Précédent"
                  onClick={() => scrollBy(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-cream"
                >
                  ←
                </button>
                <button
                  aria-label="Suivant"
                  onClick={() => scrollBy(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-cream"
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((v, i) => (
          <motion.div
            key={v.title}
            data-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative aspect-[9/16] w-[68vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[40vw] lg:w-[300px]"
            style={{ background: v.bg }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              {/* Vidéo VERTICALE (9:16) */}
              <source src={v.src} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[10px] tracking-[0.25em] text-gold-soft uppercase">
                {v.tag}
              </p>
              <p className="font-display text-2xl font-semibold text-cream">
                {v.title}
              </p>
            </div>

            <span className="absolute right-3 top-3 rounded-full bg-ink/40 px-2 py-1 text-[10px] tracking-wide text-cream/80 backdrop-blur">
              9:16
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-xs text-ink/45 sm:text-left">
            Déposez vos vidéos verticales dans{" "}
            <code className="rounded bg-ink/10 px-1.5 py-0.5">public/videos/</code>{" "}
            (vertical-1.mp4 → vertical-6.mp4)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
