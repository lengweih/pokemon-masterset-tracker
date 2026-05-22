import { Library } from "lucide-react";

import { PagePlaceholder } from "../components/ui/PagePlaceholder";

export function CollectionPage() {
  return (
    <PagePlaceholder
      description="Browse Prismatic Evolutions cards, then add filters, sorting, pagination, and variant tracking here."
      eyebrow="Collection"
      icon={Library}
      title="Collection"
    />
  );
}

export default CollectionPage;
