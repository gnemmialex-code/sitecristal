"use client";

import Reveal from "./Reveal";

const reviews = [
  { text: "Le meilleur kebab de Paris, sans débat. La viande est marinée comme nulle part ailleurs, et le pain est incroyable.", name: "Sofiane M." },
  { text: "Une institution. Mon père m'y emmenait enfant, j'y emmène mes enfants. La recette n'a jamais bougé.", name: "Clara D." },
  { text: "Les sauces maison font toute la différence. L'accueil est chaleureux, on se sent comme à la maison.", name: "Mehdi B." },
  { text: "Viande tendre, pain frais, portions généreuses. Rien à redire, c'est une valeur sûre.", name: "Julien P." },
  { text: "Je viens de loin rien que pour ce kebab. Le goût est constant depuis des années.", name: "Amine K." },
  { text: "Service rapide et souriant, produits de qualité. Le sandwich frites boisson est imbattable.", name: "Laura V." },
  { text: "La meilleure adresse du quartier. Tout est fait maison et ça se sent à chaque bouchée.", name: "Thomas R." },
  { text: "Pain moelleux, viande savoureuse, sauces parfaites. Un classique parisien qui ne déçoit jamais.", name: "Nadia S." },
  { text: "Excellent rapport qualité-prix. On sort rassasié et content à chaque fois.", name: "Kevin L." },
  { text: "Une légende qui mérite sa réputation. Frites maison croustillantes, top !", name: "Inès M." },
  { text: "Toujours du monde, et pour cause. La qualité est au rendez-vous depuis 1981.", name: "Rachid T." },
  { text: "Goût authentique, accueil au top. Mon kebab préféré sur Paris sans hésiter.", name: "Élodie F." },
  { text: "Des produits frais, une cuisson parfaite. On revient les yeux fermés.", name: "Bilal A." },
  { text: "Le sandwich seul vaut déjà le détour. Avec frites maison c'est encore mieux.", name: "Marine C." },
  { text: "Adresse incontournable du 10e. Convivial, généreux et délicieux.", name: "Yanis B." },
];

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 text-gold ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="avis" className="relative overflow-hidden bg-cream py-16 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-10 sm:mb-16">
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
      </div>

      {/* Avis Google en défilement continu (gauche → droite) */}
      <div className="relative">
        <div className="flex w-max animate-marquee-reverse">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {reviews.map((r, i) => (
                <figure
                  key={i}
                  className="mr-4 flex h-full w-[230px] shrink-0 flex-col rounded-2xl border border-ink/10 bg-cream-soft p-5 sm:mr-6 sm:w-[360px] sm:rounded-3xl sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <Stars className="text-sm" />
                    <span className="text-[10px] font-semibold tracking-wide text-ink/40">
                      AVIS GOOGLE
                    </span>
                  </div>
                  <blockquote className="mt-4 flex-1 leading-relaxed text-ink/80">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-ink/10 pt-5">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-ink/50">Avis Google · ★★★★★</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>

        {/* Fondus latéraux */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent sm:w-28" />
      </div>
    </section>
  );
}
