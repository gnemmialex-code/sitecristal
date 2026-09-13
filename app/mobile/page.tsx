"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Aperçu du site dans un châssis iPhone 16 Pro.
 * Viewport logique : 402 × 874 pt (1206 × 2622 px @3x).
 * Page de prévisualisation interne : elle n'est pas référencée par le site public.
 */
const DEVICE = {
  name: "iPhone 16 Pro",
  screenW: 402,
  screenH: 874,
  bezel: 12,
  screenRadius: 54,
};

export default function MobilePreviewPage() {
  const [path, setPath] = useState("/");
  const [draftPath, setDraftPath] = useState("/");
  const [landscape, setLandscape] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [scale, setScale] = useState(1);

  const screenW = landscape ? DEVICE.screenH : DEVICE.screenW;
  const screenH = landscape ? DEVICE.screenW : DEVICE.screenH;
  const frameW = screenW + DEVICE.bezel * 2;
  const frameH = screenH + DEVICE.bezel * 2;

  // Ajuste le châssis à la fenêtre sans jamais l'agrandir au-delà de 1:1.
  useEffect(() => {
    const fit = () => {
      const available = {
        w: window.innerWidth - 64,
        h: window.innerHeight - 150,
      };
      setScale(Math.min(1, available.w / frameW, available.h / frameH));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [frameW, frameH]);

  const submitPath = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const next = draftPath.startsWith("/") ? draftPath : `/${draftPath}`;
      setDraftPath(next);
      setPath(next);
      setReloadKey((k) => k + 1);
    },
    [draftPath],
  );

  const buttonClass =
    "rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-medium text-white/80 transition hover:border-white/35 hover:bg-white/10 hover:text-white";

  const sideButton = "absolute bg-gradient-to-b from-[#6b6a67] to-[#3b3a37]";

  const statusTime = useMemo(
    () =>
      new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
    [],
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center overflow-hidden bg-[#0b0b0c] font-sans">
      {/* Halo d'arrière-plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(171,132,66,0.18), transparent 70%)",
        }}
      />

      {/* Barre d'outils */}
      <header className="relative z-10 flex w-full flex-wrap items-center justify-center gap-3 px-6 pt-5 pb-3">
        <span className="mr-1 text-[12px] tracking-[0.18em] text-white/40 uppercase">
          {DEVICE.name}
        </span>

        <form onSubmit={submitPath} className="flex items-center gap-2">
          <input
            value={draftPath}
            onChange={(e) => setDraftPath(e.target.value)}
            spellCheck={false}
            aria-label="Chemin à prévisualiser"
            className="w-56 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12px] text-white/90 outline-none placeholder:text-white/30 focus:border-white/40"
            placeholder="/"
          />
          <button type="submit" className={buttonClass}>
            Aller
          </button>
        </form>

        <button
          type="button"
          className={buttonClass}
          onClick={() => setReloadKey((k) => k + 1)}
        >
          Recharger
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => setLandscape((v) => !v)}
        >
          {landscape ? "Portrait" : "Paysage"}
        </button>
        <a href={path} target="_blank" rel="noreferrer" className={buttonClass}>
          Ouvrir ↗
        </a>

        <span className="text-[11px] tabular-nums text-white/35">
          {screenW}×{screenH} pt · {Math.round(scale * 100)}%
        </span>
      </header>

      {/* Châssis */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div
          style={{
            width: frameW,
            height: frameH,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          className="relative shrink-0"
        >
          {/* Boutons latéraux */}
          <div
            className={`${sideButton} -left-[3px] top-[112px] h-[32px] w-[3px] rounded-l-[2px]`}
          />
          <div
            className={`${sideButton} -left-[3px] top-[170px] h-[62px] w-[3px] rounded-l-[2px]`}
          />
          <div
            className={`${sideButton} -left-[3px] top-[248px] h-[62px] w-[3px] rounded-l-[2px]`}
          />
          <div
            className={`${sideButton} -right-[3px] top-[150px] h-[36px] w-[3px] rounded-r-[2px]`}
          />
          <div
            className={`${sideButton} -right-[3px] top-[210px] h-[86px] w-[3px] rounded-r-[2px]`}
          />

          {/* Coque titane */}
          <div
            className="absolute inset-0 rounded-[68px] p-[3px]"
            style={{
              background:
                "linear-gradient(150deg, #8e8d8a 0%, #4c4b48 22%, #2a2a28 50%, #56554f 78%, #9a9995 100%)",
              boxShadow:
                "0 40px 90px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div className="h-full w-full rounded-[65px] bg-black p-[9px]">
              {/* Écran */}
              <div
                className="relative h-full w-full overflow-hidden bg-white"
                style={{ borderRadius: DEVICE.screenRadius }}
              >
                <iframe
                  key={`${reloadKey}-${landscape}`}
                  src={path}
                  title={`Aperçu ${DEVICE.name} — ${path}`}
                  className="block border-0 bg-white"
                  style={{ width: screenW, height: screenH }}
                />

                {/* Dynamic Island */}
                {!landscape && (
                  <div className="pointer-events-none absolute top-[11px] left-1/2 h-[36px] w-[125px] -translate-x-1/2 rounded-full bg-black">
                    <div className="absolute top-1/2 right-[13px] h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-[#101418] ring-[0.5px] ring-white/10" />
                  </div>
                )}

                {/* Heure (barre d'état) */}
                {!landscape && (
                  <span className="pointer-events-none absolute top-[18px] left-[34px] text-[15px] font-semibold text-white mix-blend-difference">
                    {statusTime}
                  </span>
                )}

                {/* Indicateur d'accueil */}
                <div className="pointer-events-none absolute bottom-[8px] left-1/2 h-[5px] w-[140px] -translate-x-1/2 rounded-full bg-black/45 mix-blend-difference" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 pb-4 text-[11px] text-white/30">
        1206 × 2622 px @3x · aperçu local, non indexé
      </footer>
    </div>
  );
}
