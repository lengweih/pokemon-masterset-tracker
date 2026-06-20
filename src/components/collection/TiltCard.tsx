import { useRef } from "react";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

// Max tilt at the card edges, the hover "lift" scale, and the spring feel.
const MAX_TILT_DEG = 14;
const HOVER_SCALE = 1.04;
const GLARE_OPACITY = 0.5;
const SPRING = { stiffness: 250, damping: 20, mass: 0.4 } as const;

// Shared card-image classes so the tilt and reduced-motion variants match.
const CARD_IMAGE_CLASS =
  "aspect-[63/88] w-full rounded-[5.25cqw] object-cover shadow-soft-md";

interface TiltCardProps {
  src: string;
  alt: string;
}

// A card image that tilts in 3D toward the pointer on hover (TCG-Pocket style):
// stationary, only rotating on X/Y, with a moving sheen and a slight lift. Springs
// back to flat on leave. Falls back to a plain image when reduced motion is set.
export function TiltCard({ src, alt }: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Raw pointer-driven inputs; springs below smooth them out.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const hover = useMotionValue(0);

  const rotateX = useSpring(tiltX, SPRING);
  const rotateY = useSpring(tiltY, SPRING);
  const scale = useSpring(
    useTransform(hover, [0, 1], [1, HOVER_SCALE]),
    SPRING,
  );
  const sheenX = useSpring(glareX, SPRING);
  const sheenY = useSpring(glareY, SPRING);
  const sheenOpacity = useSpring(
    useTransform(hover, [0, 1], [0, GLARE_OPACITY]),
    SPRING,
  );
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.7), rgba(255,255,255,0) 75%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width; // 0..1
    const py = (event.clientY - rect.top) / rect.height; // 0..1
    tiltY.set((px - 0.5) * 2 * MAX_TILT_DEG); // horizontal -> rotateY
    tiltX.set(-(py - 0.5) * 2 * MAX_TILT_DEG); // vertical -> rotateX
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    glareX.set(50);
    glareY.set(50);
    hover.set(0);
  };

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto w-full max-w-[300px] [container-type:inline-size]">
        <img
          alt={alt}
          className={CARD_IMAGE_CLASS}
          decoding="async"
          src={src}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[300px] py-2 [container-type:inline-size] [perspective:1000px]">
      <motion.div
        ref={ref}
        className="relative"
        style={{ rotateX, rotateY, scale }}
        onPointerEnter={() => hover.set(1)}
        onPointerLeave={resetTilt}
        onPointerMove={handlePointerMove}
      >
        <img
          alt={alt}
          className={CARD_IMAGE_CLASS}
          decoding="async"
          draggable={false}
          src={src}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[5.25cqw] mix-blend-soft-light"
          style={{ backgroundImage: sheen, opacity: sheenOpacity }}
        />
      </motion.div>
    </div>
  );
}
