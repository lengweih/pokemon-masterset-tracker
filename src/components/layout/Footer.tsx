import { ExternalLink, Heart } from "lucide-react";

import { APP_CONFIG } from "../../config/app";

export function Footer() {
  return (
    <footer
      aria-label="App footer"
      className="surface-card flex min-h-14 flex-col justify-center gap-3 px-5 py-4 text-sm font-medium text-text-secondary sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0"
    >
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
        <p className="text-text-secondary">
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

      <div className="flex flex-wrap items-center gap-2 text-text-secondary sm:justify-end">
        <span className="inline-flex items-center gap-2">
          <Heart
            aria-hidden="true"
            className="rainbow-heart h-4 w-4"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <span>{APP_CONFIG.footerTagline}</span>
        </span>
        <span aria-hidden="true" className="text-text-muted">
          •
        </span>
        <span>{APP_CONFIG.version}</span>
      </div>
    </footer>
  );
}
