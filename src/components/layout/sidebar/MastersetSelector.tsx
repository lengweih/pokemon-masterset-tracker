import { ChevronDown } from "lucide-react";

import { images } from "../../../assets/images";
import { APP_CONFIG } from "../../../config/app";

export function MastersetSelector() {
  return (
    <button
      aria-label="Select masterset"
      className="inner-ring flex h-12 w-full items-center justify-between rounded-button bg-surface px-2 text-left text-body text-text-primary transition-all duration-180 ease-premium hover:bg-surface-hover"
      type="button"
    >
      <span className="flex min-w-0 items-center gap-2">
        <img
          src={images.selectorIcon}
          alt=""
          aria-hidden="true"
          className="h-8 w-8 shrink-0 object-contain"
        />
        <span className="truncate font-medium">{APP_CONFIG.currentSetName}</span>
      </span>
      <ChevronDown
        aria-hidden="true"
        className="h-5 w-5 mr-1 shrink-0 text-text-secondary"
        strokeWidth={2}
      />
    </button>
  );
}
