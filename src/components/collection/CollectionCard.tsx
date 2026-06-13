import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

import type {
  CollectionCard as CollectionCardModel,
  CollectionViewId,
} from "../../types/collection";
import { WishlistButton } from "./WishlistButton";

interface CollectionCardProps {
  card: CollectionCardModel;
  isWishlisted: boolean;
  ownedVariantCount: number;
  // The view this card is shown in, so the detail page can navigate prev/next
  // within the same list (passed through as `?from=`).
  collectionView: CollectionViewId;
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
        "inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-button border border-border-strong bg-surface px-3 text-xs font-semibold text-primary transition-colors duration-180 ease-premium hover:bg-primary-light xs:px-4 xs:text-sm",
        className,
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <Pencil aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
      {actionLabel}
    </button>
  );
}

function CardDetailLink({
  card,
  collectionView,
}: {
  card: CollectionCardModel;
  collectionView: CollectionViewId;
}) {
  return (
    <Link
      aria-label={`View details for ${card.name}`}
      className={[pokemonCardLayerClass, "z-10"].join(" ")}
      to={`/collection/${card.id}?from=${collectionView}`}
    >
      <span className="sr-only">View details for {card.name}</span>
    </Link>
  );
}

export function CollectionCard({
  card,
  isWishlisted,
  ownedVariantCount,
  collectionView,
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

      <CardDetailLink card={card} collectionView={collectionView} />

      <div
        className={[
          "pointer-events-none z-20 flex flex-col justify-between overflow-hidden bg-text-primary/60 p-3 opacity-0 backdrop-blur-[2px] transition-opacity duration-240 ease-premium group-focus-within:opacity-100 group-hover:opacity-100",
          pokemonCardLayerClass,
        ].join(" ")}
      >
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

        <div className="pointer-events-none grid w-full gap-2 group-focus-within:pointer-events-auto group-hover:pointer-events-auto">
          <WishlistButton
            cardName={card.name}
            className="h-9 w-full min-w-0 px-3 text-xs xs:px-4 xs:text-sm"
            isWishlisted={isWishlisted}
            onClick={() => {
              onWishlistToggle(card.id);
            }}
          />
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
