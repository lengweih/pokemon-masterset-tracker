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
      DEFAULT: "#EEF2F8",
      strong: "#DDE5F0",
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
      success: {
        DEFAULT: "#22C55E",
        bg: "#EAFBF1",
      },
      warning: {
        DEFAULT: "#F59E0B",
        bg: "#FFF7E7",
      },
      danger: {
        DEFAULT: "#F43F5E",
        bg: "#FFF1F3",
      },
      info: {
        DEFAULT: "#06B6D4",
        bg: "#ECFEFF",
      },
    },
    progress: {
      track: "#E9ECF3",
    },
    variant: {
      base: {
        bg: "#F3F4F6",
        text: "#64748B",
      },
      reverse: {
        bg: "#E0F2FE",
        text: "#0284C7",
      },
      "poke-ball": {
        bg: "#FCE7F3",
        text: "#DB2777",
      },
      "master-ball": {
        bg: "#F3E8FF",
        text: "#9333EA",
      },
    },
  },
  gradients: {
    brand: "var(--gradient-brand)",
  },
  typography: {
    fontFamily: {
      sans: ["var(--font-sans)"],
    },
    fontSize: {
      display: [
        "64px",
        { lineHeight: "1", letterSpacing: "0", fontWeight: "700" },
      ],
      h1: [
        "48px",
        { lineHeight: "1.1", letterSpacing: "0", fontWeight: "700" },
      ],
      h2: [
        "36px",
        { lineHeight: "1.2", letterSpacing: "0", fontWeight: "700" },
      ],
      h3: [
        "28px",
        { lineHeight: "1.3", letterSpacing: "0", fontWeight: "650" },
      ],
      card: ["18px", { lineHeight: "1.4", fontWeight: "600" }],
      body: ["15px", { lineHeight: "1.55", fontWeight: "500" }],
      label: ["13px", { lineHeight: "1.4", fontWeight: "500" }],
      tiny: ["11px", { lineHeight: "1", fontWeight: "500" }],
    },
  },
  spacing: {
    "22": "88px",
    page: "32px",
    card: "24px",
    section: "48px",
    layout: {
      navigation: "280px",
      content: "1440px",
    },
  },
  screens: {
    "2xs": "420px",
    xs: "560px",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    pill: "var(--radius-pill)",
    card: "var(--radius-card)",
  },
  shadows: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    inner: "var(--inner-ring)",
  },
  motion: {
    durations: {
      180: "180ms",
      240: "240ms",
      320: "320ms",
    },
    easing: {
      premium: "var(--ease-premium)",
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
