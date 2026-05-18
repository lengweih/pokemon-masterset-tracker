import { designTokens } from "./tokens";

export const fontFamilies = designTokens.typography.fontFamily;

export const fontLoading = {
  preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
  stylesheet:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
} as const;
