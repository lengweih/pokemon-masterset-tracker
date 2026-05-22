import { Package } from "lucide-react";

import { PagePlaceholder } from "../components/ui/PagePlaceholder";

export function ProductListPage() {
  return (
    <PagePlaceholder
      description="Products related to the current Pokémon TCG set will live here, including product type and release notes."
      eyebrow="Product List"
      icon={Package}
      title="Product List"
    />
  );
}

export default ProductListPage;
