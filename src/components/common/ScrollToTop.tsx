import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Resets the scroll position to the top on forward navigations (clicking a
// link). Back/forward (POP) navigations are left alone so the browser can
// restore the previous scroll position.
export function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname, navigationType]);

  return null;
}
