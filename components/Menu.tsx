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
    label: "Kebab & Assiette",
    items: [
      {
        name: "Sandwich seul",
        desc: "Viande marinée au feu, pain maison, crudités fraîches, sauce signature",
        price: "9",
      },
      {
        name: "Sandwich + Frites",
        desc: "Notre sandwich accompagné de frites maison",
        price: "10",
      },
      {
        name: "Sandwich + frites + boisson",
        desc: "La formule complète : sandwich, frites maison et boisson",
        price: "11,50",
        signature: true,
      },
      {
        name: "Sandwich + boisson",
        desc: "Notre sandwich accompagné d&apos;une boisson au choix",
        price: "10,50",
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
            Préparé à la commande · Fait maison · Halal certifié
          </p>
        </Reveal>
      </div>
    </section>
  );
}
