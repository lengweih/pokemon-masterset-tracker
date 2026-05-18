export const designTokens = {
  colors: {
    bg: "#F8F9FC",
    surface: {
      DEFAULT: "#FFFFFF",
      secondary: "#F6F7FB",
      hover: "#F3F4FA",
    },
    text: {
      primary: "#0F172A",
      secondary: "#5B6478",
      muted: "#8A94A6",
    },
    border: {
      DEFAULT: "#E7EAF3",
      strong: "#D9DEEA",
    },
    primary: {
      DEFAULT: "#5B5CF0",
      hover: "#4B4CE2",
      light: "#EEF0FF",
    },
    brand: {
      blue: "#2F80FF",
      violet: "#7B61FF",
      purple: "#C061FF",
      cyan: "#06B6D4",
    },
    status: {
      success: "#22C55E",
      successBg: "#EAFBF1",
      warning: "#F59E0B",
      warningBg: "#FFF7E7",
      danger: "#F43F5E",
      dangerBg: "#FFF1F3",
      info: "#06B6D4",
      infoBg: "#ECFEFF",
    },
    progress: {
      track: "#E9ECF3",
    },
    variant: {
      baseBg: "#EEF2FF",
      baseText: "#5B5CF0",
      reverseBg: "#E0F2FE",
      reverseText: "#0284C7",
      pokeBallBg: "#F3F4F6",
      pokeBallText: "#64748B",
      masterBallBg: "#FCE7F3",
      masterBallText: "#DB2777",
      promoBg: "#ECFDF5",
      promoText: "#059669",
      cosmosBg: "#E0F2FE",
      cosmosText: "#0369A1",
    },
  },
  gradients: {
    brand: "linear-gradient(135deg, #2F80FF 0%, #7B61FF 55%, #C061FF 100%)",
    soft:
      "linear-gradient(135deg, rgba(47, 128, 255, 0.12) 0%, rgba(123, 97, 255, 0.1) 55%, rgba(192, 97, 255, 0.12) 100%)",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    fontSize: {
      display: ["64px", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "800" }],
      h1: ["48px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
      h2: ["36px", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "700" }],
      h3: ["28px", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "700" }],
      card: ["18px", { lineHeight: "1.4", fontWeight: "600" }],
      body: ["15px", { lineHeight: "1.6", fontWeight: "500" }],
      label: ["13px", { lineHeight: "1.4", fontWeight: "600" }],
      tiny: ["11px", { lineHeight: "1", fontWeight: "600" }],
    },
  },
  spacing: {
    scale: {
      0: "0px",
      px: "1px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      8: "32px",
      10: "40px",
      12: "48px",
      16: "64px",
      20: "80px",
      page: "32px",
      card: "24px",
      section: "48px",
      sidebar: "280px",
    },
    layout: {
      sidebar: "280px",
      content: "1440px",
      pagePadding: "32px",
      cardGap: "24px",
      sectionGap: "48px",
    },
  },
  radius: {
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "24px",
    pill: "999px",
    card: "20px",
  },
  shadows: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.04)",
    md: "0 6px 20px rgba(91, 92, 240, 0.06)",
    lg: "0 12px 40px rgba(91, 92, 240, 0.08)",
  },
  motion: {
    durations: {
      180: "180ms",
      240: "240ms",
      320: "320ms",
    },
    easing: {
      premium: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
