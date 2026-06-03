import { MastersetSelector } from "./MastersetSelector";
import { AppBrand } from "./AppBrand";

export function NavigationHeader() {
  return (
    <section
      aria-label="Navigation header"
      className="surface-panel flex flex-col justify-between gap-3"
    >
      <AppBrand />
      <MastersetSelector />
    </section>
  );
}
