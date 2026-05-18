import type { Config } from "tailwindcss";
import { designTokens } from "./src/theme/tokens";

type FontSizeToken = readonly [
  string,
  {
    readonly lineHeight: string;
    readonly letterSpacing?: string;
    readonly fontWeight: string;
  },
];

const toFontSize = (
  token: FontSizeToken,
): [string, { lineHeight: string; letterSpacing?: string; fontWeight: string }] => [
  token[0],
  { ...token[1] },
];

const fontSize = {
  display: toFontSize(designTokens.typography.fontSize.display),
  h1: toFontSize(designTokens.typography.fontSize.h1),
  h2: toFontSize(designTokens.typography.fontSize.h2),
  h3: toFontSize(designTokens.typography.fontSize.h3),
  card: toFontSize(designTokens.typography.fontSize.card),
  body: toFontSize(designTokens.typography.fontSize.body),
  label: toFontSize(designTokens.typography.fontSize.label),
  tiny: toFontSize(designTokens.typography.fontSize.tiny),
};

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    spacing: designTokens.spacing.scale,
    extend: {
      backgroundImage: {
        "gradient-brand": designTokens.gradients.brand,
      },
      borderRadius: {
        sm: designTokens.radius.sm,
        DEFAULT: designTokens.radius.md,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        xl: designTokens.radius.xl,
        full: designTokens.radius.pill,
        pill: designTokens.radius.pill,
        button: designTokens.radius.md,
        card: designTokens.radius.card,
        modal: designTokens.radius.xl,
      },
      boxShadow: {
        "soft-sm": designTokens.shadows.sm,
        "soft-md": designTokens.shadows.md,
        "soft-lg": designTokens.shadows.lg,
      },
      colors: {
        background: designTokens.colors.bg,
        surface: designTokens.colors.surface,
        text: designTokens.colors.text,
        border: designTokens.colors.border,
        primary: designTokens.colors.primary,
        brand: designTokens.colors.brand,
        success: designTokens.colors.status.success,
        warning: designTokens.colors.status.warning,
        danger: designTokens.colors.status.danger,
        info: designTokens.colors.status.info,
        variant: designTokens.colors.variant,
        progress: {
          track: designTokens.colors.progress.track,
        },
      },
      fontFamily: {
        sans: [...designTokens.typography.fontFamily.sans],
      },
      fontSize,
      maxWidth: {
        content: designTokens.spacing.layout.content,
      },
      transitionDuration: designTokens.motion.durations,
      transitionTimingFunction: designTokens.motion.easing,
      width: {
        sidebar: designTokens.spacing.layout.sidebar,
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
