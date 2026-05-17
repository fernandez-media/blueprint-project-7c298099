import { motion } from "framer-motion";
import { scrollRevealCinematic, scrollRevealGlow } from "@/lib/scrollAnimations";

type ModuleDef = {
  title: string;
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

const ModuleBlock = ({ mod, index }: { mod: ModuleDef; index: number }) => (
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
      {mod.items.map((item) => (
        <li key={item} className="hbm-list-item">
          <span className="hbm-list-dash" />
          <span className="hbm-list-text">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const HackbarMenu = () => {
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
          padding: 36px clamp(20px, 4vw, 48px) 28px;
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
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 6px;
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
        .hbm-title {
          margin: 0;
          font-family: 'Michroma', sans-serif;
          font-size: clamp(34px, 7vw, 64px);
          line-height: 0.95;
          color: #fff;
          letter-spacing: 0.01em;
          white-space: nowrap;
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1.5vw, 16px);
        }
        .hbm-title .menu-word {
          font-weight: 300;
          opacity: 0.7;
          font-size: clamp(20px, 4.2vw, 36px);
          letter-spacing: 0.12em;
        }
        .hbm-sub {
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          letter-spacing: 0.32em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          margin: 6px 0 0 2px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hbm-sub-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FF3B3B;
          box-shadow: 0 0 8px #FF3B3B;
          animation: hbm-pulse 1.8s ease-in-out infinite;
        }
        .hbm-fp {
          position: relative;
          width: 56px; height: 56px;
          flex-shrink: 0;
          filter: drop-shadow(0 0 8px rgba(255,59,59,0.5));
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
          gap: 6px;
        }
        .hbm-list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
          cursor: default;
          transition: transform 0.25s ease, color 0.25s ease, text-shadow 0.25s ease;
        }
        .hbm-list-item:hover {
          transform: translateX(4px);
          color: #fff;
          text-shadow: 0 0 8px rgba(255,59,59,0.6);
        }
        .hbm-list-dash {
          width: 18px;
          height: 1px;
          background: rgba(255,255,255,0.35);
          flex-shrink: 0;
        }
        .hbm-list-item:hover .hbm-list-dash {
          background: #FF3B3B;
          box-shadow: 0 0 6px #FF3B3B;
        }

        .hbm-build {
          position: relative;
          z-index: 3;
          margin-top: 28px;
          padding: 20px 22px;
          border-radius: 12px;
          border: 1px solid rgba(255,59,59,0.3);
          background: linear-gradient(90deg, rgba(255,59,59,0.08), rgba(255,59,59,0.02));
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
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
        @keyframes hbm-sweep {
          0%, 60% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .hbm-build-left {
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .hbm-gear {
          width: 28px; height: 28px;
          color: #FF3B3B;
          animation: hbm-rotate 14s linear infinite;
        }
        @keyframes hbm-rotate {
          to { transform: rotate(360deg); }
        }
        .hbm-build-title {
          font-family: 'Michroma', sans-serif;
          font-size: 15px;
          color: #fff;
          letter-spacing: 0.04em;
          margin: 0;
        }
        .hbm-build-formula {
          position: relative;
          z-index: 1;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
        }
        .hbm-build-formula b { color: #FF3B3B; font-weight: 600; }

        .hbm-tagline {
          position: relative;
          z-index: 3;
          margin-top: 22px;
          padding: 14px 18px;
          border-radius: 10px;
          background: #000;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
        }
        .hbm-tagline-dots {
          flex: 1;
          height: 1px;
          background-image: linear-gradient(to right, rgba(255,255,255,0.4) 50%, transparent 0%);
          background-size: 6px 1px;
          background-repeat: repeat-x;
          opacity: 0.5;
        }
      `}</style>

      <motion.p
        {...scrollRevealGlow}
        style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(16px, 2vw, 24px)",
          color: "#FFFFFF",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 24,
          textAlign: "center",
          width: "100%",
        }}
      >
        HACKBAR MENU
      </motion.p>

      <div className="hbm-card">
        <span className="hbm-corner tl" />
        <span className="hbm-corner tr" />
        <span className="hbm-corner bl" />
        <span className="hbm-corner br" />
        <span className="hbm-scan" />

        <div className="hbm-header">
          <div>
            <h2 className="hbm-title">
              HACKBAR <span className="menu-word">MENU</span>
            </h2>
            <p className="hbm-sub">
              <span className="hbm-sub-dot" />
              BLUEPRINT NUTRITION DIVISION
            </p>
          </div>
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
        </div>

        <div className="hbm-grid">
          {MODULES.map((mod, i) => (
            <ModuleBlock key={mod.title} mod={mod} index={i} />
          ))}
        </div>

        <div className="hbm-build">
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
          <p className="hbm-build-formula">
            <b>1</b> PROTEIN · <b>1</b> CARB · <b>1</b> VEGGIE
          </p>
        </div>

        <div className="hbm-tagline">
          <span className="hbm-tagline-dots" />
          Feed clarity, not inflammation.
          <span className="hbm-tagline-dots" />
        </div>
      </div>
    </motion.section>
  );
};

export default HackbarMenu;
