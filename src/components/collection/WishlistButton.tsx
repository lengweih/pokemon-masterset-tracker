import { Heart } from "lucide-react";

interface WishlistButtonProps {
  cardName: string;
  isWishlisted: boolean;
  onClick: () => void;
  className?: string;
}

// Shared wishlist toggle button used by the collection card overlay and the
// card detail page so they stay visually consistent. The button chrome matches
// the collection Add/Edit button and does not change with state; only the heart
// changes — a blue outline when not wishlisted, filled blue when wishlisted.
// Size, width, and text size come from `className` (the overlay uses a smaller,
// shrinkable variant on small screens).
export function WishlistButton({
  cardName,
  isWishlisted,
  onClick,
  className = "",
}: WishlistButtonProps) {
  return (
    <button
      aria-label={
        isWishlisted
          ? `Remove ${cardName} from wishlist`
          : `Add ${cardName} to wishlist`
      }
      aria-pressed={isWishlisted}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-button border border-border-strong bg-surface font-semibold text-primary transition-colors duration-180 ease-premium hover:bg-primary-light",
        className,
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <Heart
        aria-hidden="true"
        className={["h-4 w-4 shrink-0", isWishlisted ? "fill-current" : ""].join(
          " ",
        )}
        strokeWidth={2}
      />
      {isWishlisted ? "Wishlisted" : "Wishlist"}
    </button>
  );
}
