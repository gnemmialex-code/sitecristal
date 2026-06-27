"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const title = "CRISTAL";

const bgImages = Array.from({ length: 12 }, (_, i) => `/images/${i + 1}.jpg`);

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* Scrolling photo background (1.jpg → 12.jpg) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="flex h-full w-max animate-marquee-slow">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex h-full shrink-0" aria-hidden={dup === 1}>
              {bgImages.map((src, i) => (
                <div
                  key={i}
                  className="relative h-full w-[45vw] shrink-0 sm:w-[30vw] lg:w-[22vw]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                    className="object-cover"
                    priority={dup === 0 && i < 3}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Darkening overlays for readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-ink/65" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,_transparent_25%,_rgba(13,13,12,0.6))]" />

      {/* Text */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-20 text-center px-5"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="kicker text-xs sm:text-sm text-cream/70 mb-5"
        >
          Paris · Depuis 1981
        </motion.p>

        <h1 className="font-display font-black leading-[0.82] tracking-tight">
          <span className="block text-2xl sm:text-4xl font-medium italic text-cream/80 mb-2">
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
                className="inline-block text-[15vw] sm:text-[15vw] lg:text-[13rem] text-cream drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
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
          className="mx-auto mt-8 max-w-md text-base sm:text-lg text-cream/80 text-balance"
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
            className="group relative overflow-hidden rounded-full bg-cream px-8 py-3.5 text-sm font-medium text-ink"
          >
            <span className="relative z-10">Découvrir la maison</span>
            <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-cream/40 px-8 py-3.5 text-sm font-medium text-cream hover:border-cream hover:bg-cream hover:text-ink transition-colors"
          >
            Nous trouver
          </a>
        </motion.div>

        {/* Contact, horaires & réseaux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 text-cream/85"
        >
          <p className="text-sm sm:text-base">
            Ouvert du lundi au vendredi ·{" "}
            <span className="font-semibold text-cream">11h — 22h</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/lecristal1981/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram du Cristal 1981"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.99.05-1.53.21-1.89.35-.47.18-.81.4-1.17.76-.36.36-.58.7-.76 1.17-.14.36-.3.9-.35 1.89C3.01 8.48 3 8.85 3 12s.01 3.52.07 4.76c.05.99.21 1.53.35 1.89.18.47.4.81.76 1.17.36.36.7.58 1.17.76.36.14.9.3 1.89.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.99-.05 1.53-.21 1.89-.35.47-.18.81-.4 1.17-.76.36-.36.58-.7.76-1.17.14-.36.3-.9.35-1.89.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-.99-.21-1.53-.35-1.89a3.15 3.15 0 0 0-.76-1.17 3.15 3.15 0 0 0-1.17-.76c-.36-.14-.9-.3-1.89-.35C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zM17.64 6.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
              </svg>
            </a>
            <a
              href="tel:0153346017"
              aria-label="Appeler Le Cristal 1981"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M6.62 10.79a15.5 15.5 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="h-10 w-px bg-gradient-to-b from-cream/60 to-transparent" />
      </motion.div>
    </section>
  );
}
