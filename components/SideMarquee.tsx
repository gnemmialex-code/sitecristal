const phrase =
  "LE CRISTAL 1981   ✦   2 RUE DE MAZAGRAN, PARIS 10ᵉ   ✦   MAISON DEPUIS 1981   ✦   KEBAB D'EXCEPTION   ✦";

export default function SideMarquee({
  side = "left",
}: {
  side?: "left" | "right";
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed top-0 z-30 hidden h-screen w-8 overflow-hidden bg-[#c01818] md:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <div className="flex h-max flex-col animate-marquee-y">
        {[0, 1].map((dup) => (
          <span
            key={dup}
            className="whitespace-nowrap py-0 text-center text-[11px] font-semibold tracking-[0.25em] text-white"
            style={{ writingMode: "vertical-rl" }}
          >
            {phrase} {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
