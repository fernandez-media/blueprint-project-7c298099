import { useState } from "react";

interface PricingFeature {
  text: string;
}

interface PricingTier {
  systemNumber: string;
  tierLabel: string;
  pipsActive: number;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: PricingFeature[];
  cta: string;
  isPopular?: boolean;
}

const TIERS: PricingTier[] = [
  {
    systemNumber: "SYSTEM 01",
    tierLabel: "FOUNDATION",
    pipsActive: 1,
    name: "ESSENTIAL",
    priceMonthly: 480,
    priceYearly: 480,
    features: [
      { text: "12 sessions per month ($40/session)" },
      { text: "Ideal for a consistent 3x/week routine" },
      { text: "1-hour guided classes (max 3 per session)" },
      { text: "Additional classes at $30 (vs. $60 regular)" },
      { text: "Early booking through the system" },
      { text: "No signup fee" },
    ],
    cta: "INITIALIZE",
  },
  {
    systemNumber: "SYSTEM 02",
    tierLabel: "POPULAR",
    pipsActive: 2,
    name: "ACTIVE",
    priceMonthly: 560,
    priceYearly: 560,
    features: [
      { text: "16 sessions per month ($35/session)" },
      { text: "Train 4x/week — more sessions, more results" },
      { text: "1-hour guided classes (max 3 per session)" },
      { text: "Additional classes at $30 (vs. $60 regular)" },
      { text: "Early booking through the system" },
      { text: "No signup fee" },
    ],
    cta: "ACTIVATE",
    isPopular: true,
  },
  {
    systemNumber: "SYSTEM 03",
    tierLabel: "MAXIMUM",
    pipsActive: 3,
    name: "ALL IN",
    priceMonthly: 600,
    priceYearly: 600,
    features: [
      { text: "20 sessions per month ($30/session)" },
      { text: "Full commitment — train 5x/week" },
      { text: "1-hour guided classes (max 3 per session)" },
      { text: "Additional classes at $30 (vs. $60 regular)" },
      { text: "Early booking through the system" },
      { text: "No signup fee" },
    ],
    cta: "DEPLOY",
  },
];

interface Props {
  isYearly: boolean;
}

const PricingCardsHarshGlow = ({ isYearly }: Props) => {
  const popularIndex = TIERS.findIndex((t) => t.isPopular);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    popularIndex !== -1 ? popularIndex : null
  );

  const handleCardClick = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) return;
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="harsh-grid">
      {TIERS.map((tier, index) => {
        const price = isYearly ? tier.priceYearly : tier.priceMonthly;
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={tier.name}
            className={`harsh-card ${tier.isPopular ? "harsh-popular" : ""} ${isExpanded ? "harsh-expanded" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {/* Corner brackets HUD */}
            <div className="harsh-corner harsh-corner-tl" />
            <div className="harsh-corner harsh-corner-tr" />
            <div className="harsh-corner harsh-corner-bl" />
            <div className="harsh-corner harsh-corner-br" />

            {/* Scan line */}
            <div className="harsh-scan" />

            {/* Tier label + pips */}
            <div className="harsh-tier">
              <div className="harsh-pips">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`harsh-pip ${i < tier.pipsActive ? "harsh-pip-on" : ""}`}
                  />
                ))}
              </div>
              {tier.tierLabel}
            </div>

            {/* Plan name */}
            <div className="harsh-name">{tier.name}</div>

            {/* System number */}
            <div className="harsh-system">{tier.systemNumber}</div>

            {/* Price */}
            <div className="harsh-price-area">
              <div className="harsh-price">${price}</div>
              <div className="harsh-permo">PER MONTH</div>
            </div>

            {/* Features (hidden until hover) */}
            <div className="harsh-features">
              {tier.features.map((feat) => (
                <div key={feat.text} className="harsh-feat">
                  <span className="harsh-feat-icon">✓</span>
                  {feat.text}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="harsh-cta" type="button">
              {tier.cta}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCardsHarshGlow;
