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
              01 00 00 00 00
            </p>
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
