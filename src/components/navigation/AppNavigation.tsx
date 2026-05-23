import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { images } from "../../assets/images";
import { APP_CONFIG } from "../../config/app";
import { ROUTES } from "../../routes/paths";
import { MastersetSelector } from "./MastersetSelector";
import { NavigationHeader } from "./NavigationHeader";
import { NavigationPanel } from "./NavigationPanel";
import { NavigationLinks } from "./NavigationLinks";
import { ProfileCard } from "./ProfileCard";

export function AppNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    setIsMobileMenuOpen(true);
  };

  return (
    <>
      <header
        aria-label="Mobile app navigation"
        className="relative z-40 lg:hidden"
      >
        <div className="surface-card flex h-16 items-center gap-2 p-2">
          <div className="flex min-w-0 items-center gap-2">
            <button
              aria-controls="mobile-navigation-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className="inner-ring relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-button bg-surface text-text-primary transition-all duration-180 ease-premium hover:bg-surface-hover"
              type="button"
              onClick={toggleMobileMenu}
            >
              <motion.span
                aria-hidden="true"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  rotate: isMobileMenuOpen ? -90 : 0,
                  scale: isMobileMenuOpen ? 0.86 : 1,
                }}
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <Menu className="h-6 w-6" strokeWidth={2} />
              </motion.span>
              <motion.span
                aria-hidden="true"
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  rotate: isMobileMenuOpen ? 0 : 90,
                  scale: isMobileMenuOpen ? 1 : 0.86,
                }}
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </motion.span>
            </button>

            <Link
              aria-label="Go to dashboard"
              className="flex h-11 min-w-0 items-center gap-2 rounded-button pr-3 transition-all duration-180 ease-premium hover:bg-surface-hover"
              to={ROUTES.home}
              onClick={closeMobileMenu}
            >
              <img
                src={images.titleIcon}
                alt=""
                aria-hidden="true"
                className="h-8 w-8 shrink-0 object-contain"
              />
              <span className="truncate text-[16px] font-bold leading-none text-text-primary">
                {APP_CONFIG.name}
              </span>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              className="surface-panel pt-4 absolute left-0 right-0 top-full z-40 mt-3 grid origin-top gap-3"
              initial={{
                clipPath: "inset(0 0 100% 0 round 24px)",
              }}
              animate={{
                clipPath: "inset(0 0 0% 0 round 24px)",
                transition: {
                  duration: 0.25,
                },
              }}
              exit={{
                clipPath: "inset(0 0 100% 0 round 24px)",
                transition: {
                  duration: 0.15,
                },
              }}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) {
                  closeMobileMenu();
                }
              }}
            >
              <MastersetSelector />
              <NavigationLinks />
              <ProfileCard />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <aside
        aria-label="Desktop app navigation"
        className="hidden h-full flex-col gap-3 lg:flex"
      >
        <NavigationHeader />
        <NavigationPanel />
      </aside>
    </>
  );
}
