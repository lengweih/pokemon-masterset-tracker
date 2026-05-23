import { Link } from "react-router-dom";

import { images } from "../../assets/images";
import { APP_CONFIG } from "../../config/app";
import { ROUTES } from "../../routes/paths";

export function AppBrand() {
  return (
    <Link
      aria-label="Go to dashboard"
      className="flex h-14 items-center justify-center gap-2 rounded-button px-3 transition-all duration-180 ease-premium hover:bg-surface-hover"
      to={ROUTES.home}
    >
      <img
        src={images.titleIcon}
        alt=""
        aria-hidden="true"
        className="h-14 w-14 shrink-0 object-contain"
      />
      <h1 className="whitespace-nowrap text-xl font-bold leading-none text-text-primary">
        {APP_CONFIG.name}
      </h1>
    </Link>
  );
}
