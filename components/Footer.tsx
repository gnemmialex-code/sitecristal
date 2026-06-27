"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream overflow-hidden">
      {/* Giant wordmark */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-center leading-none text-[22vw] sm:text-[16vw] tracking-tight shimmer-text select-none"
        >
          CRISTAL
        </motion.h2>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-12 pt-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-t border-cream/10 pt-12">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-bold">Le Cristal 1981</p>
            <p className="mt-3 max-w-sm text-sm text-cream/55">
              L&apos;institution du kebab parisien. Une recette, un savoir-faire,
              une légende qui dure depuis 1981.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gold-soft mb-4">Adresse</p>
            <p className="text-sm text-cream/60 leading-relaxed">
              2 rue de Mazagran
              <br />
              75010 Paris
              <br />
              <a href="tel:0153346017" className="hover:text-cream">
                01 53 34 60 17
              </a>
            </p>
            <a
              href="https://www.instagram.com/lecristal1981/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-cream/60 hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.99.05-1.53.21-1.89.35-.47.18-.81.4-1.17.76-.36.36-.58.7-.76 1.17-.14.36-.3.9-.35 1.89C3.01 8.48 3 8.85 3 12s.01 3.52.07 4.76c.05.99.21 1.53.35 1.89.18.47.4.81.76 1.17.36.36.7.58 1.17.76.36.14.9.3 1.89.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.99-.05 1.53-.21 1.89-.35.47-.18.81-.4 1.17-.76.36-.36.58-.7.76-1.17.14-.36.3-.9.35-1.89.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-.99-.21-1.53-.35-1.89a3.15 3.15 0 0 0-.76-1.17 3.15 3.15 0 0 0-1.17-.76c-.36-.14-.9-.3-1.89-.35C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zM17.64 6.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
              </svg>
              @lecristal1981
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-gold-soft mb-4">Navigation</p>
            <ul className="space-y-2 text-sm text-cream/60">
              {[
                ["Histoire", "#histoire"],
                ["La Carte", "#carte"],
                ["Galerie", "#galerie"],
                ["Nous trouver", "#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="link-underline hover:text-cream">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cream/10 pt-7 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Le Cristal 1981 · Tous droits réservés</p>
          <p>Halal certifié · Fait maison · Paris 10ᵉ</p>
        </div>
      </div>
    </footer>
  );
}
