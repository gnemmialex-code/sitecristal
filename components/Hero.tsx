"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const KebabSpit3D = dynamic(() => import("./KebabSpit3D"), { ssr: false });

const title = "CRISTAL";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream"
    >
      {/* static decorative gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(171,132,66,0.18),_transparent_62%)]" />
      </div>

      {/* Rotating kebab spit behind the title */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="h-[78vmin] w-[78vmin] max-w-[680px] opacity-90">
          <KebabSpit3D />
        </div>
      </div>

      {/* gradient fade for title readability */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(circle_at_center,_rgba(239,227,205,0.35)_0%,_transparent_45%),linear-gradient(to_bottom,transparent_55%,var(--cream))]" />

      {/* Text */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-20 text-center px-5"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="kicker text-xs sm:text-sm text-ink/60 mb-5"
        >
          Paris · Depuis 1981
        </motion.p>

        <h1 className="font-display font-black leading-[0.82] tracking-tight">
          <span className="block text-2xl sm:text-4xl font-medium italic text-ink/70 mb-2">
            Le
          </span>
          <span className="flex justify-center overflow-hidden">
            {title.split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block text-[18vw] sm:text-[15vw] lg:text-[13rem] text-ink"
              >
                {c}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.7em" }}
            transition={{ delay: 0.9, duration: 1 }}
            className="block text-sm sm:text-base tracking-[0.7em] text-gold font-sans font-semibold mt-2"
          >
            1981
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mx-auto mt-8 max-w-md text-base sm:text-lg text-ink/70 text-balance"
        >
          L&apos;institution du kebab parisien. Viandes marinées au feu,
          pain pétri maison, sauces qui ont fait notre légende.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#presentation"
            className="group relative overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-cream"
          >
            <span className="relative z-10">Découvrir la maison</span>
            <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-ink/30 px-8 py-3.5 text-sm font-medium text-ink hover:border-ink hover:bg-ink hover:text-cream transition-colors"
          >
            Nous trouver
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-ink/50">SCROLL</span>
        <span className="h-10 w-px bg-gradient-to-b from-ink/50 to-transparent" />
      </motion.div>
    </section>
  );
}
