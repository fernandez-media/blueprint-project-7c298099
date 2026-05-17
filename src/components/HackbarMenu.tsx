import { useState } from "react";
import { motion } from "framer-motion";
import { scrollRevealCinematic } from "@/lib/scrollAnimations";

type ModuleKey = "PROTEIN" | "CARB" | "VEGGIE";

type ModuleDef = {
  title: ModuleKey;
  badge: string;
  desc: string;
  items: string[];
  color: string;
  dotStyle: "filled" | "outline";
};

const MODULES: ModuleDef[] = [
  {
    title: "PROTEIN",
    badge: "MODULE",
    desc: "Selección de proteínas limpias, alta biodisponibilidad.",
    items: ["CHURRASCO", "PECHUGA", "SALMÓN", "CARNE MOLIDA"],
    color: "#FF3B3B",
    dotStyle: "filled",
  },
  {
    title: "CARB",
    badge: "MODULE",
    desc: "Energía funcional. Nada inflamatorio.",
    items: ["MAJADO DE VIANDAS", "PAPAS SALTEADAS", "ARROZ JAZMÍN"],
    color: "#FFFFFF",
    dotStyle: "outline",
  },
  {
    title: "VEGGIE",
    badge: "MODULE",
    desc: "Micronutrientes. Digestión. Balance.",
    items: ["ESPÁRRAGOS", "BRÓCOLI", "ZANAHORIA"],
    color: "#22C55E",
    dotStyle: "filled",
  },
];

type Selection = Partial<Record<ModuleKey, string>>;

const ModuleBlock = ({
  mod,
  index,
  selected,
  onToggle,
}: {
  mod: ModuleDef;
  index: number;
  selected?: string;
  onToggle: (key: ModuleKey, item: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    className="hbm-module"
  >
    <div className="hbm-module-head">
      <span
        className="hbm-dot"
        style={
          mod.dotStyle === "filled"
            ? {
                background: mod.color,
                boxShadow: `0 0 12px ${mod.color}, 0 0 24px ${mod.color}55`,
              }
            : {
                background: "transparent",
                border: `1.5px solid ${mod.color}`,
              }
        }
      />
      <h3 className="hbm-module-title">
        <span style={{ fontWeight: 800 }}>{mod.title}</span>{" "}
        <span style={{ fontWeight: 300, opacity: 0.75 }}>{mod.badge}</span>
      </h3>
    </div>
    <p className="hbm-module-desc">{mod.desc}</p>
    <ul className="hbm-list">
      {mod.items.map((item) => {
        const isActive = selected === item;
        return (
          <li key={item}>
            <button
              type="button"
              role="checkbox"
              aria-checked={isActive}
              onClick={() => onToggle(mod.title, item)}
              className={`hbm-list-item ${isActive ? "is-active" : ""}`}
              style={
                isActive
                  ? ({
                      "--hbm-acc": mod.color,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="hbm-list-dash" />
              <span className="hbm-list-text">{item}</span>
              {isActive && (
                <span className="hbm-list-check" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  </motion.div>
);

const HackbarMenu = () => {
  const [selection, setSelection] = useState<Selection>({});

  const toggle = (key: ModuleKey, item: string) => {
    setSelection((prev) => ({
      ...prev,
      [key]: prev[key] === item ? undefined : item,
    }));
  };

  const reset = () => setSelection({});

  const lockedCount = (Object.values(selection).filter(Boolean) as string[]).length;
  const ready = lockedCount === 3;

  return (
    <motion.section
      {...scrollRevealCinematic}
      style={{
        backgroundColor: "#0a0a0a",
        padding: "0 6% 88px",
        marginTop: "-32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes hbm-scan {
          0% { transform: translateY(-10%); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes hbm-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes hbm-line-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .hbm-card {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(255,59,59,0.04) 0%, rgba(255,255,255,0.015) 100%);
          border: 1px solid rgba(255,59,59,0.22);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          overflow: hidden;
          padding: 36px clamp(16px, 4vw, 48px) 28px;
          box-shadow: 0 30px 80px -40px rgba(255,59,59,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .hbm-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,59,59,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,59,59,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          pointer-events: none;
          opacity: 0.4;
        }
        .hbm-scan {
          position: absolute;
          left: 0; right: 0;
          top: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(255,59,59,0.18), transparent);
          animation: hbm-scan 7s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
        .hbm-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: rgba(255,59,59,0.7);
          pointer-events: none;
          z-index: 3;
        }
        .hbm-corner.tl { top: 10px; left: 10px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .hbm-corner.tr { top: 10px; right: 10px; border-top: 1.5px solid; border-right: 1.5px solid; }
        .hbm-corner.bl { bottom: 10px; left: 10px; border-bottom: 1.5px solid; border-left: 1.5px solid; }
        .hbm-corner.br { bottom: 10px; right: 10px; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        .hbm-header {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 18px);
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 6px;
          flex-wrap: nowrap;
        }
        .hbm-header::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #FF3B3B 50%, transparent);
          transform-origin: left;
          animation: hbm-line-grow 1.4s ease-out forwards;
        }
        .hbm-fp {
          position: relative;
          width: clamp(34px, 9vw, 56px);
          height: clamp(34px, 9vw, 56px);
          flex-shrink: 0;
          filter: drop-shadow(0 0 8px rgba(255,59,59,0.5));
        }
        .hbm-header-text {
          min-width: 0;
          flex: 1;
        }
        .hbm-title {
          margin: 0;
          font-family: 'Michroma', sans-serif;
          font-size: clamp(16px, 6vw, 56px);
          line-height: 1;
          color: #fff;
          letter-spacing: 0.01em;
          white-space: nowrap;
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 1.4vw, 14px);
        }
        .hbm-title .menu-word {
          font-weight: 300;
          opacity: 0.7;
          font-size: clamp(10px, 3.4vw, 32px);
          letter-spacing: 0.12em;
        }
        .hbm-sub {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(8px, 2vw, 10px);
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          margin: 8px 0 0 0;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hbm-sub-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FF3B3B;
          box-shadow: 0 0 8px #FF3B3B;
          animation: hbm-pulse 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        .hbm-grid {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 28px;
        }
        @media (max-width: 768px) {
          .hbm-grid { grid-template-columns: 1fr; gap: 22px; }
        }

        .hbm-module {
          position: relative;
          padding: 18px 16px 20px;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .hbm-module:hover {
          border-color: rgba(255,59,59,0.25);
          background: rgba(255,59,59,0.03);
          transform: translateY(-2px);
        }
        .hbm-module-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .hbm-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: hbm-pulse 2.4s ease-in-out infinite;
        }
        .hbm-module-title {
          font-family: 'Michroma', sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          color: #fff;
          margin: 0;
          letter-spacing: 0.03em;
        }
        .hbm-module-desc {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          line-height: 1.55;
          margin: 0 0 14px 26px;
        }
        .hbm-list {
          list-style: none;
          padding: 0;
          margin: 0 0 0 26px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hbm-list-item {
          width: 100%;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
          cursor: pointer;
          text-align: left;
          transition: transform 0.25s ease, color 0.25s ease, text-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .hbm-list-item:hover {
          transform: translateX(4px);
          color: #fff;
          text-shadow: 0 0 8px rgba(255,59,59,0.6);
          border-color: rgba(255,255,255,0.08);
        }
        .hbm-list-item:focus-visible {
          outline: 1px solid rgba(255,59,59,0.6);
          outline-offset: 2px;
        }
        .hbm-list-item.is-active {
          background: color-mix(in srgb, var(--hbm-acc) 12%, transparent);
          border-color: color-mix(in srgb, var(--hbm-acc) 55%, transparent);
          color: #fff;
          text-shadow: 0 0 10px color-mix(in srgb, var(--hbm-acc) 80%, transparent);
        }
        .hbm-list-dash {
          width: 18px;
          height: 1px;
          background: rgba(255,255,255,0.35);
          flex-shrink: 0;
          transition: background 0.25s ease, box-shadow 0.25s ease, height 0.25s ease;
        }
        .hbm-list-item:hover .hbm-list-dash {
          background: #FF3B3B;
          box-shadow: 0 0 6px #FF3B3B;
        }
        .hbm-list-item.is-active .hbm-list-dash {
          background: var(--hbm-acc);
          box-shadow: 0 0 8px var(--hbm-acc);
          height: 2px;
        }
        .hbm-list-text { flex: 1; }
        .hbm-list-check {
          color: var(--hbm-acc);
          font-weight: 700;
          font-size: 14px;
          text-shadow: 0 0 8px var(--hbm-acc);
        }

        .hbm-build {
          position: relative;
          z-index: 3;
          margin-top: 28px;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,59,59,0.3);
          background: linear-gradient(90deg, rgba(255,59,59,0.08), rgba(255,59,59,0.02));
          overflow: hidden;
        }
        .hbm-build::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%);
          transform: translateX(-100%);
          animation: hbm-sweep 4s ease-in-out infinite;
          pointer-events: none;
        }
        .hbm-build.is-ready::before {
          animation-duration: 1.8s;
        }
        @keyframes hbm-sweep {
          0%, 60% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .hbm-build-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .hbm-build-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hbm-gear {
          width: 22px; height: 22px;
          color: #FF3B3B;
          animation: hbm-rotate 14s linear infinite;
        }
        @keyframes hbm-rotate { to { transform: rotate(360deg); } }
        .hbm-build-title {
          font-family: 'Michroma', sans-serif;
          font-size: 13px;
          color: #fff;
          letter-spacing: 0.04em;
          margin: 0;
        }
        .hbm-build-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .hbm-build-meta b { color: #fff; font-weight: 700; }
        .hbm-ready-badge {
          padding: 3px 8px;
          border-radius: 4px;
          background: #FF3B3B;
          color: #000;
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.2em;
          animation: hbm-pulse 1.2s ease-in-out infinite;
        }
        .hbm-reset {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.55);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 2px 4px;
        }
        .hbm-reset:hover { color: #FF3B3B; }
        .hbm-reset:disabled { opacity: 0.3; cursor: default; }
        .hbm-slots {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 600px) {
          .hbm-slots { grid-template-columns: 1fr; }
        }
        .hbm-slot {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: rgba(0,0,0,0.35);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          min-width: 0;
        }
        .hbm-slot.is-filled {
          border-style: solid;
          border-color: color-mix(in srgb, var(--hbm-acc) 50%, transparent);
          background: color-mix(in srgb, var(--hbm-acc) 8%, rgba(0,0,0,0.35));
          color: #fff;
        }
        .hbm-slot-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }
        .hbm-slot.is-filled .hbm-slot-dot {
          background: var(--hbm-acc);
          box-shadow: 0 0 8px var(--hbm-acc);
        }
        .hbm-slot-label {
          opacity: 0.7;
          flex-shrink: 0;
        }
        .hbm-slot-value {
          font-weight: 600;
          letter-spacing: 0.08em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .hbm-tagline {
          position: relative;
          z-index: 3;
          margin-top: 22px;
          padding: 14px 14px;
          border-radius: 10px;
          background: #000;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(9px, 2.4vw, 12px);
          letter-spacing: clamp(0.05em, 0.8vw, 0.2em);
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
          white-space: nowrap;
          flex-wrap: nowrap;
        }
        .hbm-tagline-text { white-space: nowrap; flex-shrink: 0; }
        .hbm-tagline-dots {
          flex: 1;
          min-width: 8px;
          height: 1px;
          background-image: linear-gradient(to right, rgba(255,255,255,0.4) 50%, transparent 0%);
          background-size: 6px 1px;
          background-repeat: repeat-x;
          opacity: 0.5;
        }
      `}</style>

      <div className="hbm-card">
        <span className="hbm-corner tl" />
        <span className="hbm-corner tr" />
        <span className="hbm-corner bl" />
        <span className="hbm-corner br" />
        <span className="hbm-scan" />

        <div className="hbm-header">
          <svg
            className="hbm-fp"
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            {[18, 26, 34, 42, 50].map((ry, i) => (
              <ellipse
                key={i}
                cx="70"
                cy="75"
                rx={ry * 0.7}
                ry={ry}
                stroke="#FF3B3B"
                strokeWidth="2"
              />
            ))}
            <path
              d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z"
              stroke="#FF3B3B"
              strokeWidth="1.6"
              fill="none"
            />
          </svg>
          <div className="hbm-header-text">
            <h2 className="hbm-title">
              HACKBAR <span className="menu-word">MENU</span>
            </h2>
            <p className="hbm-sub">
              <span className="hbm-sub-dot" />
              BLUEPRINT NUTRITION DIVISION
            </p>
          </div>
        </div>

        <div className="hbm-grid">
          {MODULES.map((mod, i) => (
            <ModuleBlock
              key={mod.title}
              mod={mod}
              index={i}
              selected={selection[mod.title]}
              onToggle={toggle}
            />
          ))}
        </div>

        <div className={`hbm-build ${ready ? "is-ready" : ""}`}>
          <div className="hbm-build-top">
            <div className="hbm-build-left">
              <svg
                className="hbm-gear"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <h4 className="hbm-build-title">BUILD SYSTEM</h4>
            </div>
            <div className="hbm-build-meta">
              <span>
                <b>{lockedCount}</b> / 3 LOCKED
              </span>
              {ready && <span className="hbm-ready-badge">READY</span>}
              <button
                type="button"
                className="hbm-reset"
                onClick={reset}
                disabled={lockedCount === 0}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="hbm-slots">
            {MODULES.map((mod) => {
              const val = selection[mod.title];
              return (
                <div
                  key={mod.title}
                  className={`hbm-slot ${val ? "is-filled" : ""}`}
                  style={{ ["--hbm-acc" as any]: mod.color }}
                >
                  <span className="hbm-slot-dot" />
                  <span className="hbm-slot-label">{mod.title}:</span>
                  <span className="hbm-slot-value">{val ?? "——"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hbm-tagline">
          <span className="hbm-tagline-dots" />
          <span className="hbm-tagline-text">Feed clarity, not inflammation.</span>
          <span className="hbm-tagline-dots" />
        </div>
      </div>
    </motion.section>
  );
};

export default HackbarMenu;
