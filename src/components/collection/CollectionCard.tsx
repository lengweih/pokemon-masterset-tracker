import { Heart, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

import type { CollectionCard as CollectionCardModel } from "../../types/collection";

interface CollectionCardProps {
  card: CollectionCardModel;
  isWishlisted: boolean;
  ownedVariantCount: number;
  onEditVariants: (card: CollectionCardModel) => void;
  onWishlistToggle: (cardId: string) => void;
}

const pokemonCardFrameClass =
  "aspect-[63/88] w-full max-w-[280px] [container-type:inline-size]";
const pokemonCardLayerClass =
  "absolute inset-0 h-full w-full rounded-[5.25cqw]";

function CollectionEditButton({
  card,
  className = "",
  ownedVariantCount,
  onClick,
}: {
  card: CollectionCardModel;
  className?: string;
  ownedVariantCount: number;
  onClick: () => void;
}) {
  const actionLabel = ownedVariantCount > 0 ? "Edit" : "Add";

  return (
    <button
      aria-label={`${actionLabel} variants for ${card.name}`}
      className={[
        "inline-flex h-9 items-center justify-center gap-2 rounded-button border border-border-strong bg-surface px-4 text-sm font-semibold text-primary transition-colors duration-180 ease-premium hover:bg-primary-light",
        className,
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <Pencil aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      {actionLabel}
    </button>
  );
}

function WishlistButton({
  card,
  className = "",
  isWishlisted,
  onClick,
}: {
  card: CollectionCardModel;
  className?: string;
  isWishlisted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={
        isWishlisted
          ? `Remove ${card.name} from wishlist`
          : `Add ${card.name} to wishlist`
      }
      aria-pressed={isWishlisted}
      className={[
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface transition-colors duration-180 ease-premium",
        isWishlisted ? "text-danger" : "text-text-secondary hover:text-danger",
        className,
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <Heart
        aria-hidden="true"
        className={["h-4 w-4", isWishlisted ? "fill-current" : ""].join(" ")}
        strokeWidth={2}
      />
    </button>
  );
}

function CardDetailLink({ card }: { card: CollectionCardModel }) {
  return (
    <Link
      aria-label={`View details for ${card.name}`}
      className={[pokemonCardLayerClass, "z-10"].join(" ")}
      to={`/collection/${card.id}`}
    >
      <span className="sr-only">View details for {card.name}</span>
    </Link>
  );
}

export function CollectionCard({
  card,
  isWishlisted,
  ownedVariantCount,
  onEditVariants,
  onWishlistToggle,
}: CollectionCardProps) {
  return (
    <article
      className={[
        "group relative mx-auto transition-transform duration-240 ease-premium hover:-translate-y-0.5",
        pokemonCardFrameClass,
      ].join(" ")}
    >
      <img
        alt={card.imageAlt}
        className={[pokemonCardLayerClass, "object-cover drop-shadow-sm"].join(
          " ",
        )}
        decoding="async"
        loading="lazy"
        src={card.imageUrl}
      />

      <CardDetailLink card={card} />

      <div
        className={[
          "pointer-events-none z-20 flex flex-col justify-between overflow-hidden bg-text-primary/60 p-3 opacity-0 backdrop-blur-[2px] transition-opacity duration-240 ease-premium group-focus-within:opacity-100 group-hover:opacity-100",
          pokemonCardLayerClass,
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 text-white">
            <p className="text-xs font-semibold leading-none text-white/75">
              #{card.number}
            </p>
            <h2
              className="mt-1 truncate text-sm font-semibold leading-[1.25] text-white"
              title={card.name}
            >
              {card.name}
            </h2>
          </div>

          <WishlistButton
            card={card}
            className="pointer-events-none group-focus-within:pointer-events-auto group-hover:pointer-events-auto"
            isWishlisted={isWishlisted}
            onClick={() => {
              onWishlistToggle(card.id);
            }}
          />
        </div>

        <div className="pointer-events-none grid w-full gap-2 group-focus-within:pointer-events-auto group-hover:pointer-events-auto">
          <CollectionEditButton
            card={card}
            className="w-full"
            ownedVariantCount={ownedVariantCount}
            onClick={() => {
              onEditVariants(card);
            }}
          />
        </div>
      </div>
    </article>
  );
}
