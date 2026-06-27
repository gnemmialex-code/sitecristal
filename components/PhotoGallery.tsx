"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const photos = [
  {
    title: "La devanture",
    tag: "Rue de Mazagran",
    src: "/images/1.jpg",
    bg: "radial-gradient(circle at 35% 30%, rgba(171,132,66,0.55), transparent 60%), linear-gradient(160deg, #2a2620, #0d0d0c)",
  },
  {
    title: "La broche",
    tag: "Cuisson au feu",
    src: "/images/4.jpg",
    bg: "radial-gradient(circle at 65% 40%, rgba(239,227,205,0.3), transparent 55%), linear-gradient(160deg, #211e19, #14130f)",
  },
  {
    title: "L'assiette",
    tag: "Générosité",
    src: "/images/12.jpg",
    bg: "radial-gradient(circle at 40% 65%, rgba(194,160,99,0.45), transparent 55%), linear-gradient(160deg, #2a2620, #0d0d0c)",
  },
  {
    title: "Légumes frais",
    tag: "Fait maison",
    src: "/images/6.jpg",
    bg: "radial-gradient(circle at 55% 35%, rgba(171,132,66,0.4), transparent 60%), linear-gradient(160deg, #1a1916, #14130f)",
  },
  {
    title: "Les sauces",
    tag: "Préparées le matin",
    src: "/images/5.jpg",
    bg: "radial-gradient(circle at 45% 35%, rgba(194,160,99,0.5), transparent 58%), linear-gradient(160deg, #211e19, #0d0d0c)",
  },
  {
    title: "La salle",
    tag: "Ambiance 1981",
    src: "/images/8.jpg",
    bg: "radial-gradient(circle at 60% 55%, rgba(171,132,66,0.35), transparent 60%), linear-gradient(160deg, #2a2620, #14130f)",
  },
];

function Photo({ photo, index }: { photo: (typeof photos)[number]; index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
      style={{ background: photo.bg }}
    >
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] tracking-[0.25em] text-gold-soft uppercase">
          {photo.tag}
        </p>
        <p className="font-display text-2xl font-semibold text-cream">
          {photo.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  return (
    <section id="photos" className="relative bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12">
          <Reveal>
            <p className="kicker text-xs text-gold mb-5">En images</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] max-w-xl text-balance">
              Le Cristal, en quelques regards
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <Photo key={p.title} photo={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
