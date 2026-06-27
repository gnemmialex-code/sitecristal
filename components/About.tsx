"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { motion } from "motion/react";

const stats = [
  { value: "1981", label: "Année de création" },
  { value: "+40", label: "Ans de savoir-faire" },
  { value: "24h", label: "Marinade des viandes" },
  { value: "3", label: "Sauces signature" },
];

export default function About() {
  return (
    <section id="histoire" className="relative bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left — visual */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-charcoal">
                <Image
                  src="/images/11.jpg"
                  alt="Le Cristal 1981"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-6 sm:-right-10 h-32 w-32 sm:h-40 sm:w-40"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <path
                      id="circle"
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="fill-ink text-[8.5px] tracking-[0.18em] font-medium uppercase">
                    <textPath href="#circle">
                      Le Cristal 1981 · Kebab d&apos;exception · Paris ·
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div className="absolute -bottom-7 -left-4 sm:-left-7 rounded-2xl bg-ink px-7 py-5 text-cream shadow-2xl">
                <p className="font-display text-3xl font-bold">N°1</p>
                <p className="text-xs text-cream/70">du quartier Paris</p>
              </div>
            </div>
          </Reveal>

          {/* Right — text */}
          <div>
            <Reveal>
              <p className="kicker text-xs text-gold mb-5">Notre histoire</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
                Une légende parisienne née en{" "}
                <span className="italic text-gold">1981</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-ink/70 text-sm sm:text-lg leading-relaxed">
                Tout commence rue de Mazagran, dans le Paris bouillonnant des
                années 80. Une braise, une recette familiale et l&apos;obsession
                du goût juste. Quarante ans plus tard, Le Cristal reste fidèle à
                ses gestes : viandes marinées maison, pain doré au four, sauces
                préparées chaque matin.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-ink/70 text-sm sm:text-lg leading-relaxed">
                Ici, le kebab n&apos;est pas de la restauration rapide. C&apos;est
                un savoir-faire transmis, une institution qui a vu grandir le
                quartier.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08}>
                  <div className="border-l border-ink/15 pl-5">
                    <p className="font-display text-3xl sm:text-4xl font-bold text-ink">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-ink/55">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
