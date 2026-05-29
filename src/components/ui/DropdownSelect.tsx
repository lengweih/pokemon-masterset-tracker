import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

type DropdownSelectValue = string | number;

export interface DropdownSelectOption<TValue extends DropdownSelectValue> {
  label: string;
  value: TValue;
}

interface DropdownSelectProps<TValue extends DropdownSelectValue> {
  className?: string;
  id?: string;
  label: string;
  onChange: (value: TValue) => void;
  options: readonly DropdownSelectOption<TValue>[];
  showLabel?: boolean;
  value: TValue;
}

const dropdownSelectStyles = {
  button:
    "data-view-field relative flex items-center appearance-none rounded-button pr-10 text-left",
  chevron:
    "pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary",
  value: "min-w-0 flex-1 truncate",
};

export function DropdownSelect<TValue extends DropdownSelectValue>({
  className,
  id,
  label,
  onChange,
  options,
  showLabel = false,
  value,
}: DropdownSelectProps<TValue>) {
  const generatedButtonId = useId();
  const optionsId = useId();
  const buttonId = id ?? generatedButtonId;
  const styles = dropdownSelectStyles;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (isOpen && activeIndex !== null) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(null);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveIndex(null);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const getNextIndex = (currentIndex: number | null, direction: 1 | -1) => {
    if (options.length === 0) {
      return 0;
    }

    const baseIndex = currentIndex ?? selectedIndex;

    return (baseIndex + direction + options.length) % options.length;
  };

  const openOptions = (nextActiveIndex: number | null = null) => {
    if (options.length === 0) {
      return;
    }

    setActiveIndex(nextActiveIndex);
    setIsOpen(true);
  };

  const closeOptions = (shouldRestoreFocus = false) => {
    setIsOpen(false);
    setActiveIndex(null);

    if (shouldRestoreFocus) {
      buttonRef.current?.focus();
    }
  };

  const toggleOptions = () => {
    if (isOpen) {
      closeOptions();
      return;
    }

    openOptions();
  };

  const selectOption = (
    option: DropdownSelectOption<TValue>,
    shouldRestoreFocus = true,
  ) => {
    onChange(option.value);
    closeOptions(shouldRestoreFocus);
  };

  const handleButtonKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openOptions(isOpen ? getNextIndex(activeIndex, 1) : selectedIndex);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openOptions(isOpen ? getNextIndex(activeIndex, -1) : selectedIndex);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      openOptions(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      openOptions(Math.max(options.length - 1, 0));
    }
  };

  const handleOptionKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    option: DropdownSelectOption<TValue>,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(getNextIndex(index, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(getNextIndex(index, -1));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(options.length - 1, 0));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(option);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeOptions(true);
      return;
    }

    if (event.key === "Tab") {
      closeOptions();
    }
  };

  return (
    <div
      ref={containerRef}
      className={["relative min-w-0", className ?? ""].join(" ")}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        aria-controls={optionsId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
        className={styles.button}
        type="button"
        onKeyDown={handleButtonKeyDown}
        onClick={toggleOptions}
      >
        <span className={styles.value}>
          {showLabel ? (
            <span className="grid gap-1">
              <span className="truncate text-[11px] font-semibold leading-none text-text-secondary">
                {label}
              </span>
              <span className="truncate text-sm font-semibold leading-[1.2] text-text-primary">
                {selectedOption?.label ?? label}
              </span>
            </span>
          ) : (
            (selectedOption?.label ?? label)
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={styles.chevron}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={optionsId}
            aria-labelledby={buttonId}
            className="surface-card absolute left-0 right-0 top-full z-20 mt-2 grid origin-top gap-1 rounded-button p-2"
            role="listbox"
            initial={{
              clipPath: "inset(0 0 100% 0 round 14px)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0 round 14px)",
              transition: {
                duration: 0.25,
              },
            }}
            exit={{
              clipPath: "inset(0 0 100% 0 round 14px)",
              transition: {
                duration: 0.15,
              },
            }}
          >
            {options.map((option, index) => {
              const optionId = `${optionsId}-${String(option.value)}`;
              const isSelected = option.value === selectedOption?.value;

              return (
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  key={String(option.value)}
                  id={optionId}
                  aria-selected={isSelected}
                  className={[
                    "flex h-11 items-center gap-3 rounded-button px-2 text-left text-sm font-medium text-text-primary transition-colors duration-180 ease-premium hover:bg-surface-hover focus:bg-surface-hover focus:outline-none",
                  ].join(" ")}
                  role="option"
                  type="button"
                  onFocus={() => {
                    setActiveIndex(index);
                  }}
                  onKeyDown={(event) => {
                    handleOptionKeyDown(event, option, index);
                  }}
                  onClick={() => {
                    selectOption(option, false);
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-brand-blue"
                      strokeWidth={2}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
