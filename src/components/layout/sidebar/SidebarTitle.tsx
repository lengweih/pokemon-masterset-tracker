import { images } from "../../../assets/images";
import { APP_CONFIG } from "../../../config/app";

export function SidebarTitle() {
  return (
    <div
      aria-label="Sidebar title"
      className="flex h-14 items-center justify-center gap-2 px-3"
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
    </div>
  );
}
