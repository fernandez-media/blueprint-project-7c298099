import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollRevealCinematic } from "@/lib/scrollAnimations";

type Juice = { name: string; benefits: string[] };
type Ritual = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  color: string;
  juices: Juice[];
};

const RITUALS: Ritual[] = [
  {
    id: "activate",
    number: "01",
    name: "ACTIVATE",
    tagline: "Metabolic Ignition",
    color: "#F59E0B",
    juices: [
      {
        name: "SUNRISE DRIVE",
        benefits: [
          "Natural energy support",
          "Immune system support",
          "Metabolism activation",
          "Digestive stimulation",
          "Anti-inflammatory support",
          "Hydration & vitamin C boost",
        ],
      },
      {
        name: "GOLDEN RUSH",
        benefits: [
          "Fast natural energy",
          "Digestive enzyme support",
          "Liver & detox support",
          "Anti-inflammatory recovery",
          "Immune reinforcement",
          "Antioxidant protection",
        ],
      },
      {
        name: "SOLAR LIFT",
        benefits: [
          "Electrolyte replenishment",
          "Deep hydration",
          "Smooth sustained energy",
          "Recovery support",
          "Metabolic balance",
          "Cellular hydration",
        ],
      },
    ],
  },
  {
    id: "balance",
    number: "02",
    name: "BALANCE",
    tagline: "Regulation. Detox. Hydration.",
    color: "#22C55E",
    juices: [
      {
        name: "QUIET FLOW",
        benefits: [
          "Deep hydration",
          "Gentle detox support",
          "Digestive balance",
          "Mineral replenishment",
          "Stable clean energy",
          "Supports circulation",
        ],
      },
      {
        name: "PURE STATE",
        benefits: [
          "Nervous system calming",
          "Cooling digestive support",
          "Alkalizing hydration",
          "Bloating reduction support",
          "Refreshing mineral intake",
          "Detox pathway support",
        ],
      },
      {
        name: "CLEAR FIELD",
        benefits: [
          "Liver detox support",
          "Antioxidant-rich nutrition",
          "Immune support",
          "Digestive stimulation",
          "Micronutrient replenishment",
          "Supports metabolic regulation",
        ],
      },
    ],
  },
  {
    id: "restore",
    number: "03",
    name: "RESTORE",
    tagline: "Repair & Circulation",
    color: "#FF3B3B",
    juices: [
      {
        name: "CRIMSON WAVE",
        benefits: [
          "Hydration recovery",
          "Circulation support",
          "Skin & collagen support",
          "Anti-inflammatory recovery",
          "Antioxidant protection",
          "Refreshing electrolyte support",
        ],
      },
      {
        name: "IRON FLOW",
        benefits: [
          "Nitric oxide support",
          "Improved circulation",
          "Exercise performance support",
          "Oxygen delivery support",
          "Recovery enhancement",
          "Endurance support",
        ],
      },
      {
        name: "RUBY REVIVAL",
        benefits: [
          "Powerful antioxidant support",
          "Cellular recovery",
          "Immune resilience",
          "Skin vitality support",
          "Anti-inflammatory protection",
          "Cardiovascular support",
        ],
      },
    ],

const PACKS = [
  { qty: "3", label: "Juices", price: "$15" },
  { qty: "6", label: "Juices", price: "$30" },
  { qty: "12", label: "Juices", price: "$50" },
];

const DetoxJuices = () => {
  const [activeId, setActiveId] = useState<string>(RITUALS[0].id);
  const active = RITUALS.find((r) => r.id === activeId)!;

  return (
    <motion.section
      {...scrollRevealCinematic}
      style={{
        backgroundColor: "#0a0a0a",
        padding: "32px 6% 88px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes dxj-scan {
          0% { transform: translateY(-10%); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes dxj-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes dxj-line-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes dxj-sweep {
          0%, 60% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .dxj-card {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          border-radius: 18px;
          background: linear-gradient(180deg, var(--dxj-bg-top) 0%, rgba(255,255,255,0.015) 100%);
          border: 1px solid var(--dxj-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          overflow: hidden;
          padding: 36px clamp(16px, 4vw, 48px) 28px;
          box-shadow: 0 30px 80px -40px var(--dxj-shadow), inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease;
        }
        .dxj-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--dxj-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--dxj-grid) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          pointer-events: none;
          opacity: 0.4;
        }
        .dxj-scan {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, var(--dxj-scan-color), transparent);
          animation: dxj-scan 7s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
        .dxj-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: var(--dxj-corner);
          pointer-events: none;
          z-index: 3;
          transition: border-color 0.5s ease;
        }
        .dxj-corner.tl { top: 10px; left: 10px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .dxj-corner.tr { top: 10px; right: 10px; border-top: 1.5px solid; border-right: 1.5px solid; }
        .dxj-corner.bl { bottom: 10px; left: 10px; border-bottom: 1.5px solid; border-left: 1.5px solid; }
        .dxj-corner.br { bottom: 10px; right: 10px; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        .dxj-header {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 18px);
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 18px;
        }
        .dxj-header::after {
          content: "";
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--dxj-line) 50%, transparent);
          transform-origin: left;
          animation: dxj-line-grow 1.4s ease-out forwards;
        }
        .dxj-icon {
          width: clamp(34px, 9vw, 50px);
          height: clamp(34px, 9vw, 50px);
          flex-shrink: 0;
          color: var(--dxj-accent);
          filter: drop-shadow(0 0 8px var(--dxj-glow));
        }
        .dxj-header-text { min-width: 0; flex: 1; }
        .dxj-title {
          margin: 0;
          font-family: 'Michroma', sans-serif;
          font-size: clamp(18px, 7vw, 52px);
          line-height: 1;
          color: #fff;
          letter-spacing: 0.01em;
          white-space: nowrap;
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 1.4vw, 14px);
        }
        .dxj-title .juice-word {
          font-weight: 300;
          opacity: 0.7;
          font-size: clamp(11px, 4vw, 30px);
          letter-spacing: 0.12em;
        }
        .dxj-sub {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(8px, 2vw, 10px);
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          margin: 8px 0 0 0;
          display: flex; align-items: center; gap: 10px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .dxj-sub-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--dxj-accent);
          box-shadow: 0 0 8px var(--dxj-accent);
          animation: dxj-pulse 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        .dxj-tabs {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 22px;
        }
        .dxj-tab {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 12px 8px;
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-family: 'Michroma', sans-serif;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .dxj-tab-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          opacity: 0.55;
        }
        .dxj-tab-name {
          font-size: clamp(10px, 2.6vw, 13px);
          letter-spacing: 0.06em;
        }
        .dxj-tab:hover {
          border-color: color-mix(in srgb, var(--dxj-tab-color) 35%, transparent);
          color: #fff;
          transform: translateY(-1px);
        }
        .dxj-tab.is-active {
          background: color-mix(in srgb, var(--dxj-tab-color) 10%, transparent);
          border-color: color-mix(in srgb, var(--dxj-tab-color) 60%, transparent);
          color: #fff;
          box-shadow: 0 0 24px -8px var(--dxj-tab-color), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .dxj-tab.is-active .dxj-tab-num {
          color: var(--dxj-tab-color);
          opacity: 1;
          text-shadow: 0 0 8px var(--dxj-tab-color);
        }
        .dxj-tab-bar {
          position: absolute;
          left: 12px; right: 12px; bottom: 6px;
          height: 2px;
          border-radius: 2px;
          background: var(--dxj-tab-color);
          box-shadow: 0 0 8px var(--dxj-tab-color);
          transform-origin: center;
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .dxj-tab.is-active .dxj-tab-bar { transform: scaleX(1); }

        .dxj-body {
          position: relative;
          z-index: 3;
        }
        .dxj-juices {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 600px) {
          .dxj-juices { grid-template-columns: 1fr; }
        }
        .dxj-juice {
          position: relative;
          padding: 16px 14px;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
        }
        .dxj-juice:hover {
          border-color: color-mix(in srgb, var(--dxj-accent) 35%, transparent);
          background: color-mix(in srgb, var(--dxj-accent) 4%, transparent);
          transform: translateY(-2px);
        }
        .dxj-juice-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .dxj-juice-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--dxj-accent);
          box-shadow: 0 0 10px var(--dxj-accent);
          flex-shrink: 0;
          animation: dxj-pulse 2.4s ease-in-out infinite;
        }
        .dxj-juice-name {
          font-family: 'Michroma', sans-serif;
          font-size: clamp(11px, 2.8vw, 14px);
          color: #fff;
          letter-spacing: 0.04em;
          margin: 0;
        }
        .dxj-ingredients {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .dxj-ing {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.7);
          padding: 3px 7px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          text-transform: uppercase;
        }

        .dxj-packs {
          margin-top: 20px;
          padding: 16px 18px;
          border-radius: 12px;
          border: 1px solid color-mix(in srgb, var(--dxj-accent) 30%, transparent);
          background: linear-gradient(90deg, color-mix(in srgb, var(--dxj-accent) 7%, transparent), color-mix(in srgb, var(--dxj-accent) 1%, transparent));
          position: relative;
          overflow: hidden;
        }
        .dxj-packs::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
          transform: translateX(-100%);
          animation: dxj-sweep 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        .dxj-packs-head {
          font-family: 'Michroma', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #fff;
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative; z-index: 1;
        }
        .dxj-packs-head::before {
          content: "";
          width: 18px; height: 1px;
          background: var(--dxj-accent);
          box-shadow: 0 0 6px var(--dxj-accent);
        }
        .dxj-packs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          position: relative; z-index: 1;
        }
        .dxj-pack {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px 8px;
          text-align: center;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
          cursor: default;
        }
        .dxj-pack:hover {
          border-color: color-mix(in srgb, var(--dxj-accent) 50%, transparent);
          background: color-mix(in srgb, var(--dxj-accent) 8%, rgba(0,0,0,0.4));
          transform: translateY(-2px);
        }
        .dxj-pack-qty {
          font-family: 'Michroma', sans-serif;
          font-size: clamp(16px, 4vw, 22px);
          color: #fff;
          line-height: 1;
        }
        .dxj-pack-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          margin-top: 4px;
        }
        .dxj-pack-price {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(13px, 3vw, 16px);
          font-weight: 700;
          color: var(--dxj-accent);
          margin-top: 8px;
          text-shadow: 0 0 8px color-mix(in srgb, var(--dxj-accent) 60%, transparent);
        }
      `}</style>

      <div
        className="dxj-card"
        style={
          {
            "--dxj-accent": active.color,
            "--dxj-bg-top": `color-mix(in srgb, ${active.color} 5%, transparent)`,
            "--dxj-border": `color-mix(in srgb, ${active.color} 25%, transparent)`,
            "--dxj-shadow": `color-mix(in srgb, ${active.color} 40%, transparent)`,
            "--dxj-grid": `color-mix(in srgb, ${active.color} 8%, transparent)`,
            "--dxj-scan-color": `color-mix(in srgb, ${active.color} 18%, transparent)`,
            "--dxj-corner": `color-mix(in srgb, ${active.color} 70%, transparent)`,
            "--dxj-line": active.color,
            "--dxj-glow": `color-mix(in srgb, ${active.color} 60%, transparent)`,
          } as React.CSSProperties
        }
      >
        <span className="dxj-corner tl" />
        <span className="dxj-corner tr" />
        <span className="dxj-corner bl" />
        <span className="dxj-corner br" />
        <span className="dxj-scan" />

        <div className="dxj-header">
          <svg
            className="dxj-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8h-7.6a2 2 0 0 1-2-1.8L5 8z" />
            <path d="M9 8V5a3 3 0 0 1 6 0v3" />
            <path d="M9 13c1.5 1.2 4.5 1.2 6 0" />
          </svg>
          <div className="dxj-header-text">
            <h2 className="dxj-title">
              DETOX <span className="juice-word">JUICES</span>
            </h2>
            <p className="dxj-sub">
              <span className="dxj-sub-dot" />
              PRÉSS · COLD-PRESSED RITUALS
            </p>
          </div>
        </div>

        <div className="dxj-tabs">
          {RITUALS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveId(r.id)}
              className={`dxj-tab ${r.id === activeId ? "is-active" : ""}`}
              style={{ ["--dxj-tab-color" as any]: r.color }}
              aria-pressed={r.id === activeId}
            >
              <span className="dxj-tab-num">RITUAL {r.number}</span>
              <span className="dxj-tab-name">{r.name}</span>
              <span className="dxj-tab-bar" />
            </button>
          ))}
        </div>

        <div className="dxj-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: "rgba(255,255,255,0.55)",
                  margin: "0 0 14px",
                  textTransform: "uppercase",
                }}
              >
                — {active.tagline}
              </p>

              <div className="dxj-juices">
                {active.juices.map((j) => (
                  <div key={j.name} className="dxj-juice">
                    <div className="dxj-juice-head">
                      <span className="dxj-juice-dot" />
                      <h3 className="dxj-juice-name">{j.name}</h3>
                    </div>
                    <div className="dxj-ingredients">
                      {j.ingredients.map((ing) => (
                        <span key={ing} className="dxj-ing">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="dxj-packs">
                <h4 className="dxj-packs-head">RITUAL PACKS</h4>
                <div className="dxj-packs-grid">
                  {PACKS.map((p) => (
                    <div key={p.qty} className="dxj-pack">
                      <div className="dxj-pack-qty">{p.qty}</div>
                      <div className="dxj-pack-label">{p.label}</div>
                      <div className="dxj-pack-price">{p.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default DetoxJuices;
