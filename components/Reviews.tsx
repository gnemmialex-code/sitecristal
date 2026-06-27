"use client";

import Reveal from "./Reveal";

const reviews = [
  {
    text: "Le meilleur kebab de Paris, sans débat. La viande est marinée comme nulle part ailleurs, et le pain est incroyable.",
    name: "Sofiane M.",
    meta: "Habitué depuis 12 ans",
  },
  {
    text: "Une institution. Mon père m'y emmenait enfant, j'y emmène mes enfants. La recette n'a jamais bougé.",
    name: "Clara D.",
    meta: "Avis Google · ★★★★★",
  },
  {
    text: "Les sauces maison font toute la différence. L'accueil est chaleureux, on se sent comme à la maison.",
    name: "Mehdi B.",
    meta: "Quartier Mazagran",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="avis" className="relative bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <p className="kicker text-xs text-gold mb-5">Ils en parlent</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-balance">
              4,8 / 5 sur plus de 2 400 avis
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-5 flex justify-center">
              <Stars />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl bg-cream-soft p-8 shadow-[0_20px_60px_-30px_rgba(13,13,12,0.4)]">
                <span className="font-display text-6xl leading-none text-gold/40">
                  &ldquo;
                </span>
                <blockquote className="-mt-4 flex-1 text-ink/80 leading-relaxed">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 border-t border-ink/10 pt-5">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-ink/50">{r.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
