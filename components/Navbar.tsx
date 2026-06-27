"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { label: "Maison", href: "#accueil" },
  { label: "Histoire", href: "#histoire" },
  { label: "Présentation", href: "#presentation" },
  { label: "Vidéos", href: "#galerie" },
  { label: "Avis", href: "#avis" },
  { label: "La Carte", href: "#carte" },
  { label: "Nous trouver", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Au-dessus du Hero sombre tant qu'on n'a pas scrollé → texte clair
  const dark = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/85 backdrop-blur-xl border-b border-ink/10 py-3 text-ink"
            : "bg-transparent py-5 text-cream"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
          <a href="#accueil" className="group flex items-center gap-3">
            <span
              className={`relative grid place-items-center h-9 w-9 rotate-45 border transition-colors duration-500 ${
                dark
                  ? "border-cream/70 group-hover:bg-cream"
                  : "border-ink/70 group-hover:bg-ink"
              }`}
            >
              <span
                className={`-rotate-45 text-[10px] font-display font-bold transition-colors duration-500 ${
                  dark ? "group-hover:text-ink" : "group-hover:text-cream"
                }`}
              >
                C
              </span>
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-bold tracking-tight">
                Le Cristal
              </span>
              <span
                className={`block text-[10px] tracking-[0.4em] ${
                  dark ? "text-cream/60" : "text-ink/60"
                }`}
              >
                EST. 1981
              </span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-9 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`link-underline ${
                    dark
                      ? "text-cream/80 hover:text-cream"
                      : "text-ink/80 hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="tel:0153346017"
            className={`hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              dark
                ? "bg-cream text-ink hover:bg-gold"
                : "bg-ink text-cream hover:bg-charcoal"
            }`}
          >
            Commander
          </a>

          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden relative h-10 w-10 grid place-items-center"
          >
            <span
              className={`absolute h-px w-6 transition-all duration-300 ${
                dark && !open ? "bg-cream" : "bg-ink"
              } ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute h-px w-6 transition-all duration-300 ${
                dark && !open ? "bg-cream" : "bg-ink"
              } ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cream lg:hidden flex flex-col justify-center px-8"
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-bold py-2 block"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="tel:0153346017"
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-3 text-cream"
            >
              Commander
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
