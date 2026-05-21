import { ExternalLink, Heart } from "lucide-react";
import { motion } from "framer-motion";

import { APP_CONFIG } from "../config/app";

export function Footer() {
  return (
    <footer
      aria-label="App footer"
      className="surface-card flex min-h-14 flex-col items-center justify-center gap-3 px-4 py-3 text-center text-[13px] font-medium text-text-secondary sm:h-14 sm:flex-row sm:justify-between sm:gap-4 sm:px-5 sm:py-0 sm:text-left sm:text-sm"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 sm:justify-start sm:gap-x-8">
        <p className="whitespace-nowrap text-text-secondary">
          © {APP_CONFIG.copyrightYear} {APP_CONFIG.name}
        </p>
        <a
          className="inline-flex items-center gap-2 text-text-secondary transition-colors duration-180 ease-premium hover:text-text-primary"
          href={APP_CONFIG.githubUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span>GitHub</span>
          <ExternalLink
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={2}
          />
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-text-secondary sm:justify-end">
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <motion.span
            aria-hidden="true"
            animate={{
              color: [
                "var(--blue)",
                "var(--violet)",
                "var(--purple)",
                "var(--cyan)",
                "var(--blue)",
              ],
            }}
            className="inline-flex h-4 w-4 items-center justify-center"
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <Heart
              className="h-4 w-4"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </motion.span>
          <span>{APP_CONFIG.footerTagline}</span>
        </span>
        <span aria-hidden="true" className="text-text-muted">
          •
        </span>
        <span className="whitespace-nowrap">{APP_CONFIG.version}</span>
      </div>
    </footer>
  );
}
