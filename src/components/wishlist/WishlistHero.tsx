import { Heart, Layers, Sparkles } from "lucide-react";

import { PageHeader } from "../common/PageHeader";
import { StatCard } from "../common/StatCard";

interface WishlistHeroProps {
  wishlistedCount: number;
  ownedVariants: number;
  totalVariants: number;
}

export function WishlistHero({
  wishlistedCount,
  ownedVariants,
  totalVariants,
}: WishlistHeroProps) {
  return (
    <PageHeader
      description="Track and organize the cards you want to add to your collection."
      eyebrow="Wishlist"
      icon={Heart}
      title="Wishlist"
      titleId="wishlist-title"
    >
      <div className="flex flex-col gap-3 xs:flex-row">
        <StatCard
          className="xs:flex-1 lg:w-[270px] lg:flex-none"
          icon={Layers}
          label="Wishlisted Cards"
          value={wishlistedCount}
        />
        <StatCard
          className="xs:flex-1 lg:w-[270px] lg:flex-none"
          icon={Sparkles}
          label="Variants Owned"
          value={totalVariants > 0 ? `${ownedVariants} / ${totalVariants}` : 0}
        />
      </div>
    </PageHeader>
  );
}
