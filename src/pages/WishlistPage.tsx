import { Heart } from "lucide-react";

import { PagePlaceholder } from "../components/ui/PagePlaceholder";

export function WishlistPage() {
  return (
    <PagePlaceholder
      description="Wishlisted cards will appear here with search, sorting, removal controls, and links back to card details."
      eyebrow="Wishlist"
      icon={Heart}
      title="Wishlist"
    />
  );
}

export default WishlistPage;
