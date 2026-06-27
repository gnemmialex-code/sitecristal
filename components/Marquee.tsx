const items = [
  "VIANDE MARINÉE 24H",
  "PAIN MAISON",
  "DEPUIS 1981",
  "SAUCE SIGNATURE",
  "PARIS 10ᵉ",
  "FAIT MAISON",
  "RECETTE D'ORIGINE",
];

export default function Marquee() {
  return (
    <div className="relative bg-ink py-4 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="px-7 font-display text-lg italic text-cream/90">
                  {t}
                </span>
                <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
