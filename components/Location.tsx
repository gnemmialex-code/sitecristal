"use client";

import Reveal from "./Reveal";

const hours = [
  { d: "Lundi — Vendredi", h: "11h — 22h" },
  { d: "Samedi — Dimanche", h: "Fermé" },
];

export default function Location() {
  return (
    <section id="contact" className="relative bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Infos */}
          <div>
            <Reveal>
              <p className="kicker text-xs text-gold mb-5">Nous trouver</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] text-balance">
                Au cœur du
                <br />
                Paris 10ᵉ
              </h2>
            </Reveal>

            <div className="mt-10 space-y-7">
              <Reveal delay={0.1}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-cream text-sm">
                    ◎
                  </span>
                  <div>
                    <p className="text-sm text-ink/50">Adresse</p>
                    <p className="text-lg font-medium">
                      2 rue de Mazagran, 75010 Paris
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-cream text-sm">
                    ✆
                  </span>
                  <div>
                    <p className="text-sm text-ink/50">Réservation & commande</p>
                    <a
                      href="tel:0153346017"
                      className="text-lg font-medium link-underline"
                    >
                      01 53 34 60 17
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-cream text-sm">
                    ⏱
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-ink/50 mb-2">Horaires</p>
                    <ul className="space-y-1.5">
                      {hours.map((h) => (
                        <li
                          key={h.d}
                          className="flex justify-between gap-6 border-b border-ink/10 pb-1.5 text-sm"
                        >
                          <span className="text-ink/70">{h.d}</span>
                          <span className="font-medium">{h.h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2+rue+de+Mazagran+75010+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream hover:bg-charcoal transition-colors"
                >
                  Itinéraire
                </a>
                <a
                  href="tel:0153346017"
                  className="rounded-full border border-ink/30 px-7 py-3.5 text-sm font-medium hover:border-ink hover:bg-ink hover:text-cream transition-colors"
                >
                  Commander
                </a>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-ink/10 shadow-[0_30px_80px_-40px_rgba(13,13,12,0.5)]">
              <iframe
                title="Le Cristal 1981 — 2 rue de Mazagran, Paris 10"
                className="h-full w-full grayscale-[0.3] contrast-110"
                style={{ border: 0, minHeight: 420 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.3477%2C48.8687%2C2.3547%2C48.8717&layer=mapnik&marker=48.8702014%2C2.3512492"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
