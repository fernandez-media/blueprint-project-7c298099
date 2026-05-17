import { memo, useEffect, useMemo, useRef, useState, ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { featureVariantByDirection, FEATURE_SMALL_SCREEN } from "@/lib/scrollAnimations";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant: "desktop" | "mobile";
  /** Tint color for the icon container background (rgba "r,g,b" string). Desktop only. */
  rgba?: string;
  /** Index in the cascade sequence (0..n). When provided, card receives a one-shot scroll-in glow at index*200ms. */
  cascadeIndex?: number;
  /** Direction the card flies in from. Defaults to "up". */
  direction?: "up" | "left" | "right";
}

/* ── Static styles (module-scope, never re-created) ── */
const BASE_SHADOW =
  "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.05)";
const ACTIVE_SHADOW =
  "0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 20px rgba(0, 0, 0, 0.08), 0 20px 48px rgba(0, 0, 0, 0.06)";
const GLOW_SHADOW =
  "0 0 0 1px #9CA3AF, 0 0 24px rgba(156, 163, 175, 0.45), 0 0 48px rgba(156, 163, 175, 0.15)";
const GLOW_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const PREFERS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TITLE_DESKTOP_STYLE: CSSProperties = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 18,
  fontWeight: 600,
  color: "#000",
  letterSpacing: "1.3px",
  textTransform: "uppercase",
  lineHeight: 1.2,
  textAlign: "center",
  margin: 0,
};

const DESC_DESKTOP_STYLE: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  fontWeight: 300,
  color: "#6B7280",
  lineHeight: 1.5,
  textAlign: "center",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  margin: 0,
};

const ICON_BOX_MOBILE_STYLE: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 11,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  background: "rgba(255, 255, 255, 0.5)",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
};

const TEXT_COL_MOBILE_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 4,
  minWidth: 0,
  flex: 1,
};

const TITLE_MOBILE_STYLE: CSSProperties = {
  fontFamily: "'Michroma', sans-serif",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  color: "#000",
  lineHeight: 1.3,
  textAlign: "center",
};

const DESC_MOBILE_STYLE: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  fontWeight: 400,
  lineHeight: 1.5,
  color: "rgba(0,0,0,0.6)",
  margin: "4px 0 0 0",
  textAlign: "center",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

/**
 * About-section feature card with viewport-driven sustained hover.
 * Uses IntersectionObserver to activate the hover state when the card
 * is ≥60% visible, deactivating again when it leaves the viewport.
 *
 * Wrapped in React.memo so a parent re-render does not re-render every
 * sibling card. Styles and observer are memoized / created once per mount.
 */
const FeatureCard = memo(function FeatureCard({
  icon,
  title,
  description,
  variant,
  rgba,
  cascadeIndex,
  direction = "up",
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cascadeGlow, setCascadeGlow] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const cascadeFiredRef = useRef(false);
  const variantRef = useMemo(() => featureVariantByDirection(direction), [direction]);
  const scanDuration = FEATURE_SMALL_SCREEN ? 600 : 900;

  // Sustained in-view observer (existing behavior)
  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView((prev) => (prev === entry.isIntersecting ? prev : entry.isIntersecting));
      },
      {
        threshold: 0.6,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // One-shot cascade glow on scroll-in (per-card, gated by cascadeIndex)
  useEffect(() => {
    if (cascadeIndex == null) return;
    if (PREFERS_REDUCED_MOTION) return;
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === "undefined") return;

    let onTimer: number | undefined;
    let offTimer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cascadeFiredRef.current) return;
        cascadeFiredRef.current = true;
        observer.disconnect();
        onTimer = window.setTimeout(() => {
          setCascadeGlow(true);
          setScanActive(true);
          offTimer = window.setTimeout(() => {
            setCascadeGlow(false);
            setScanActive(false);
          }, Math.max(700, scanDuration));
        }, cascadeIndex * 200);
      },
      { threshold: 0.2 }
    );
    observer.observe(card);

    return () => {
      observer.disconnect();
      if (onTimer) window.clearTimeout(onTimer);
      if (offTimer) window.clearTimeout(offTimer);
    };
  }, [cascadeIndex]);

  const glowActive = isHovered || cascadeGlow;

  const containerStyle = useMemo<CSSProperties>(() => {
    const transitionDur = PREFERS_REDUCED_MOTION ? "0ms" : "400ms";
    const shared: CSSProperties = {
      position: "relative",
      overflow: "hidden",
      background: "rgba(255, 255, 255, 0.65)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      border: `1px solid ${glowActive ? "#9CA3AF" : isInView ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.06)"}`,
      borderRadius: 16,
      boxShadow: glowActive ? GLOW_SHADOW : isInView ? ACTIVE_SHADOW : BASE_SHADOW,
      transform: glowActive || isInView ? "translateY(-2px)" : "translateY(0)",
      transition: `box-shadow ${transitionDur} ${GLOW_EASE}, transform ${transitionDur} ${GLOW_EASE}, border-color ${transitionDur} ${GLOW_EASE}`,
      cursor: "default",
    };
    return variant === "desktop"
      ? {
          ...shared,
          padding: "24px 20px",
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 0,
        }
      : { ...shared, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 };
  }, [isInView, variant, glowActive]);

  const hoverHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  // Scan-line sweep overlay — cinematic tech reveal that crosses the card
  // diagonally once when the cascade fires. GPU-accelerated transform only.
  const tintColor = rgba ? `rgba(${rgba}, 0.55)` : "rgba(255, 255, 255, 0.7)";
  const scanLine = !PREFERS_REDUCED_MOTION && (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "60%",
        height: "100%",
        pointerEvents: "none",
        background: `linear-gradient(115deg, transparent 0%, transparent 35%, ${tintColor} 50%, transparent 65%, transparent 100%)`,
        filter: "blur(8px)",
        opacity: scanActive ? 1 : 0,
        transform: scanActive ? "translateX(220%) skewX(-12deg)" : "translateX(-120%) skewX(-12deg)",
        transition: scanActive
          ? `transform ${scanDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${scanDuration}ms ease-out`
          : "none",
        mixBlendMode: "screen",
        zIndex: 2,
      }}
    />
  );

  if (variant === "desktop") {
    const fxDelay = cascadeIndex != null ? `${cascadeIndex * 0.6}s` : "0s";
    return (
      <motion.div
        ref={cardRef}
        variants={variantRef}
        className="feature-card-fx"
        style={{ ...containerStyle, ["--fx-delay" as never]: fxDelay }}
        {...hoverHandlers}
      >
        {scanLine}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", position: "relative", zIndex: 1 }}>
          <div style={TITLE_DESKTOP_STYLE}>{title}</div>
          <div style={DESC_DESKTOP_STYLE}>{description}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div ref={cardRef} variants={variantRef} style={containerStyle} {...hoverHandlers}>
      {scanLine}
      <div style={TEXT_COL_MOBILE_STYLE}>
        <span style={TITLE_MOBILE_STYLE}>{title}</span>
        <p style={DESC_MOBILE_STYLE}>{description}</p>
      </div>
    </motion.div>
  );
});

export default FeatureCard;
