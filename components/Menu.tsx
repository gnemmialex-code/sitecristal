"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

type Item = {
  name: string;
  desc: string;
  price: string;
  signature?: boolean;
};

const categories: { id: string; label: string; items: Item[] }[] = [
  {
    id: "kebabs",
    label: "Kebabs & Assiettes",
    items: [
      {
        name: "Le Cristal Original",
        desc: "Veau & agneau marinés 24h, pain maison, crudités, sauce signature",
        price: "9,50",
        signature: true,
      },
      {
        name: "Assiette Royale",
        desc: "Double viande, frites maison, salade, deux sauces au choix",
        price: "13,90",
        signature: true,
      },
      {
        name: "Kebab Poulet Mariné",
        desc: "Poulet grillé au feu, oignons confits, crudités fraîches",
        price: "9,00",
      },
      {
        name: "Galette Berbère",
        desc: "Pain plat doré, viande mixte, harissa maison, herbes",
        price: "10,50",
      },
    ],
  },
  {
    id: "tacos",
    label: "Tacos & Burgers",
    items: [
      {
        name: "Tacos Cristal",
        desc: "Galette, viande au choix, sauce fromagère, frites incluses",
        price: "8,90",
        signature: true,
      },
      {
        name: "Tacos Géant 3 viandes",
        desc: "Kebab, poulet, cordon bleu, double fromage",
        price: "12,50",
      },
      {
        name: "Le Cristal Burger",
        desc: "Bœuf haché maison, cheddar affiné, oignons caramélisés",
        price: "10,90",
      },
      {
        name: "Chicken Burger",
        desc: "Poulet pané croustillant, sauce blanche, salade",
        price: "9,90",
      },
    ],
  },
  {
    id: "extras",
    label: "À côté & Desserts",
    items: [
      {
        name: "Frites maison",
        desc: "Pommes de terre fraîches, double cuisson, fleur de sel",
        price: "3,50",
      },
      {
        name: "Falafels (6 pcs)",
        desc: "Pois chiches, herbes fraîches, sauce sésame",
        price: "4,50",
      },
      {
        name: "Baklava maison",
        desc: "Feuilles de filo, pistache, miel d&apos;oranger",
        price: "4,00",
        signature: true,
      },
      {
        name: "Thé à la menthe",
        desc: "Servi traditionnel, à volonté",
        price: "2,50",
      },
    ],
  },
];

export default function Menu() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="carte" className="relative bg-ink py-28 sm:py-36 text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <p className="kicker text-xs text-gold mb-5">La Carte</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-balance">
              Le goût, sans compromis
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-cream/60">
              Chaque plat est préparé à la commande, avec des produits frais et
              les recettes qui font notre réputation depuis quatre décennies.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                active === c.id ? "text-ink" : "text-cream/70 hover:text-cream"
              }`}
            >
              {active === c.id && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 rounded-full bg-cream"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{c.label}</span>
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 md:grid-cols-2"
            >
              {current.items.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex items-start justify-between gap-6 rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 hover:border-gold/40 hover:bg-cream/[0.06] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-xl font-semibold">
                        {item.name}
                      </h3>
                      {item.signature && (
                        <span className="rounded-full border border-gold/50 px-2 py-0.5 text-[10px] tracking-wide text-gold">
                          SIGNATURE
                        </span>
                      )}
                    </div>
                    <p
                      className="mt-2 text-sm leading-relaxed text-cream/55"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-display text-2xl font-bold text-gold-soft">
                      {item.price}
                    </span>
                    <span className="block text-xs text-cream/40">€</span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-sm text-cream/40">
            Menu (plat + boisson + dessert) à partir de{" "}
            <span className="text-gold-soft">12,90 €</span> · Halal certifié
          </p>
        </Reveal>
      </div>
    </section>
  );
}
