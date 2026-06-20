import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { getCollectionCardById } from "../../data/collectionCards";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { isStringArray } from "../../lib/collectionOwnership";
import { STORAGE_KEYS } from "../../lib/storageKeys";
import { ROUTES } from "../../routes/paths";
import type { CollectionCard } from "../../types/collection";
import { DashboardCardHeader } from "./DashboardCardHeader";

// How many thumbnails the carousel shows before "View Wishlist" carries the rest.
const PREVIEW_LIMIT = 12;
// When the cards overflow but only barely, Embla can't clone enough to loop, so
// repeat them up to this many slides to guarantee a seamless loop.
const LOOP_MIN_SLIDES = 15;
// Footprint of the prev/next arrows (two `w-8` buttons + two `gap-2` gaps). Cards
// "overflow" once they'd no longer fit the row with the arrows shown.
const ARROW_RESERVE_PX = 80;
// How strongly off-center cards shrink (Embla's scale-tween example uses 0.52).
const TWEEN_FACTOR_BASE = 0.06;
const AUTOPLAY_DELAY_MS = 3000;
// Matches the fade-in used by the collection/wishlist/product page tables.
const CAROUSEL_ENTER_TRANSITION = {
  duration: 0.3,
  ease: [0.64, 0, 0.78, 0],
} as const;

const numberWithinRange = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

function CarouselArrow({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="flex h-9 w-8 shrink-0 items-center justify-center rounded-lg border border-border-strong bg-surface text-text-secondary transition-all duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
      type="button"
      onClick={onClick}
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

// A dashboard preview of the user's wishlist: a centered, infinite-loop carousel
// of card thumbnails (newest first) linking straight to each card's detail.
// Autoplays and applies a scale tween so the centered card is largest, the rest
// shrink with distance. Falls back to a prompt when empty.
export function WishlistPreview() {
  const [wishlistCardIds] = useLocalStorageState<string[]>(
    STORAGE_KEYS.wishlist,
    [],
    isStringArray,
  );

  const previewCards = useMemo(
    () =>
      wishlistCardIds
        .map((cardId) => getCollectionCardById(cardId))
        .filter((card): card is CollectionCard => card !== undefined)
        .reverse()
        .slice(0, PREVIEW_LIMIT),
    [wishlistCardIds],
  );
  const hasCards = previewCards.length > 0;
  const imageUrls = useMemo(
    () => [...new Set(previewCards.map((card) => card.imageUrl))],
    [previewCards],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "center", loop: true },
    [
      Autoplay({
        delay: AUTOPLAY_DELAY_MS,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  // True only when the cards overflow the viewport (loop engages); when they all
  // fit, Embla collapses to one snap and there is nothing to scroll.
  const [canScroll, setCanScroll] = useState(false);
  // How many times to repeat the cards. 1 = static (fits); >1 only when the base
  // cards overflow, repeated so Embla always has enough material to loop.
  const [repeatCount, setRepeatCount] = useState(1);
  // The carousel fades in only once both: every image has preloaded AND the scale
  // tween has run once — so it appears already at its final size, no resize jump
  // and no per-image flash.
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isTweenReady, setIsTweenReady] = useState(false);
  // A stable, always-full-width element used purely to measure the available
  // width — independent of the (shrink-to-content) viewport, so measuring never
  // feeds back into the layout it drives.
  const measureRef = useRef<HTMLDivElement>(null);

  // Repeat the cards (whole copies) so Embla can loop when they overflow; render
  // the base set otherwise. Guarded on count so a stale repeat can't duplicate
  // a single card.
  const carouselSlides = useMemo(
    () =>
      previewCards.length > 1 && repeatCount > 1
        ? Array.from({ length: repeatCount }, () => previewCards).flat()
        : previewCards,
    [previewCards, repeatCount],
  );

  // Decide whether the base cards overflow the row (accounting for the arrows'
  // footprint) and set the repeat count accordingly. State is only set from the
  // ResizeObserver callback (which fires once on observe), never synchronously.
  useEffect(() => {
    const measureEl = measureRef.current;
    if (!emblaApi || !measureEl || previewCards.length <= 1) {
      return undefined;
    }

    const root = emblaApi.rootNode();

    const measure = () => {
      const slide = emblaApi.slideNodes()[0];
      if (!slide) {
        return;
      }
      // Base set's laid-out width (the -ml offset cancels one slide's padding).
      const slidePadding =
        Number.parseFloat(getComputedStyle(slide).paddingLeft) || 0;
      const baseWidth = previewCards.length * slide.offsetWidth - slidePadding;
      const cap = Number.parseFloat(getComputedStyle(root).maxWidth);
      const available = Math.min(
        Number.isNaN(cap) ? Infinity : cap,
        measureEl.clientWidth - ARROW_RESERVE_PX,
      );
      setRepeatCount(
        baseWidth > available
          ? Math.ceil(LOOP_MIN_SLIDES / previewCards.length)
          : 1,
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(measureEl);
    return () => observer.disconnect();
  }, [emblaApi, previewCards.length]);

  // Preload every preview image in the background; flip `imagesLoaded` only once
  // they're all ready so the cards reveal in one shot. State is set from the load
  // callbacks, never synchronously in the effect body.
  useEffect(() => {
    if (imageUrls.length === 0) {
      return undefined;
    }

    let cancelled = false;
    let remaining = imageUrls.length;
    const markOneLoaded = () => {
      remaining -= 1;
      if (remaining <= 0 && !cancelled) {
        setImagesLoaded(true);
      }
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      // decode() resolves once the image is downloaded AND decoded, so painting it
      // on reveal won't flicker. Treat failures as "done" so we never hang.
      img.decode().then(markOneLoaded, markOneLoaded);
    });

    return () => {
      cancelled = true;
    };
  }, [imageUrls]);

  // Track whether scrolling is possible, to show/hide the arrows.
  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    const onSelect = (api: EmblaCarouselType) => {
      setCanScroll(api.canScrollPrev() || api.canScrollNext());
    };

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi]);

  // Scale tween (Embla's "scale" example): the centered card is largest, the rest
  // shrink with distance from center.
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    // Scale the card itself (the slide's inner element), not the slide wrapper
    // that carries the spacing — so spacing/layout stays put.
    tweenNodes.current = api
      .slideNodes()
      .map((slideNode) => slideNode.firstElementChild as HTMLElement | null);
  }, []);

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (api: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();
      const slidesInView = api.slidesInView();
      const isScrollEvent = eventName === "scroll";

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) {
            return;
          }

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
          }
        });
      });
    },
    [],
  );

  // useLayoutEffect so the initial scale is applied before the browser paints.
  useLayoutEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    const applyInitialTween = () => {
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenScale(emblaApi);
      setIsTweenReady(true);
    };
    applyInitialTween();

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenScale)
        .off("scroll", tweenScale)
        .off("slideFocus", tweenScale);
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale]);

  // Manual arrow navigation restarts the autoplay timer so it doesn't advance
  // immediately under the user, but keeps autoplaying afterwards.
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);

  // Fade the carousel in once images are decoded and the scale is applied.
  const isReady = imagesLoaded && isTweenReady;

  return (
    <article className="surface-card min-w-0 p-6">
      <div className="flex items-start justify-between gap-4">
        <DashboardCardHeader
          description="Cards you're hunting for"
          icon={Heart}
          iconColor="#7B61FF"
          title="Wishlist"
        />
        {hasCards ? (
          <Link
            aria-label="View Wishlist"
            className="inline-flex shrink-0 items-center gap-1 rounded-button text-sm font-medium text-text-secondary transition-colors duration-180 ease-premium hover:text-text-primary"
            to={ROUTES.wishlist}
          >
            <span className="hidden 2xs:inline">View Wishlist</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={2}
            />
          </Link>
        ) : null}
      </div>

      {hasCards ? (
        <div className="mt-4">
          {/* Stable full-width reference for measuring available space, separate
              from the shrink-to-content viewport below. */}
          <div ref={measureRef} aria-hidden="true" className="h-0" />

          {/* Fade the whole carousel in (matching the page tables) once images
              are decoded and the scale is applied. It stays mounted but invisible
              meanwhile so Embla can measure and apply the scale before reveal. */}
          <motion.div
            animate={{ opacity: isReady ? 1 : 0 }}
            aria-hidden={!isReady}
            className={`flex items-center justify-center gap-2 ${
              isReady ? "" : "pointer-events-none"
            }`}
            initial={{ opacity: 0 }}
            transition={CAROUSEL_ENTER_TRANSITION}
          >
            {/* Arrows appear only when there's something to scroll, so they take
                no space when the cards fit (which stay tight + centered). */}
            {canScroll ? (
              <CarouselArrow
                icon={ChevronLeft}
                label="Previous card"
                onClick={scrollPrev}
              />
            ) : null}

            {/* Viewport shrink-wraps the cards (so a few sit tight + centered via
                the row's justify-center) and caps at 7 cards; when overflowing it
                shrinks to the available space and Embla scrolls/loops. */}
            <div
              ref={emblaRef}
              className="min-w-0 max-w-[744px] overflow-hidden sm:max-w-[856px]"
            >
              {/* Spacing via per-slide padding (+ negative container margin)
                  rather than flex `gap`, so the gap survives the loop seam. */}
              <div className="-ml-3 flex">
                {carouselSlides.map((card, slideIndex) => (
                  <div
                    key={`${card.id}-${slideIndex}`}
                    className="shrink-0 grow-0 pl-3"
                  >
                    <Link
                      aria-label={`View ${card.name}`}
                      className="block w-24 sm:w-28"
                      title={card.name}
                      to={`/collection/${card.id}?from=wishlist`}
                    >
                      <img
                        alt={card.imageAlt}
                        className="aspect-[63/88] w-full rounded-md object-cover shadow-soft-sm"
                        decoding="async"
                        src={card.imageUrl}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {canScroll ? (
              <CarouselArrow
                icon={ChevronRight}
                label="Next card"
                onClick={scrollNext}
              />
            ) : null}
          </motion.div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-card border border-dashed border-border-strong bg-surface-secondary p-4 md:p-6 text-center">
          <p className="card-title">Your wishlist is empty</p>
          <p className="max-w-md text-sm font-medium text-text-secondary">
            Browse the collection and tap the heart on any card to save it here.
          </p>
          <Link className="btn-primary mt-1" to={ROUTES.collection}>
            Browse Collection
          </Link>
        </div>
      )}
    </article>
  );
}
