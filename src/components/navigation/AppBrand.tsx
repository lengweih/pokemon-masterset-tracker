import { Link } from "react-router-dom";

import { images } from "../../assets/images";
import { ROUTES } from "../../routes/paths";

export function AppBrand() {
  return (
    <Link
      aria-label="Go to dashboard"
      className="flex h-14 items-center justify-center rounded-button px-3 transition-all duration-180 ease-premium hover:bg-surface-hover"
      to={ROUTES.home}
    >
      <img
        // Current master set logo (Prismatic Evolutions). Swap per set later.
        src={images.setLogo}
        alt=""
        aria-hidden="true"
        className="h-12 w-auto max-w-full cursor-pointer object-contain"
      />
    </Link>
  );
}
