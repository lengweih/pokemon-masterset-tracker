import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

import { images } from "../../assets/images";
import { mastersetOptions } from "../../data/mastersets";

export function MastersetSelector() {
  const optionsId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMastersetId, setSelectedMastersetId] = useState(
    mastersetOptions[0]?.id ?? "",
  );
  const selectedMasterset =
    mastersetOptions.find(
      (masterset) => masterset.id === selectedMastersetId,
    ) ?? mastersetOptions[0];

  const closeOptions = () => {
    setIsOpen(false);
  };

  const toggleOptions = () => {
    if (isOpen) {
      closeOptions();
      return;
    }

    setIsOpen(true);
  };

  return (
    <div className="relative">
      <button
        aria-controls={optionsId}
        aria-expanded={isOpen}
        aria-label="Select masterset"
        className="inner-ring flex h-12 w-full items-center justify-between rounded-button bg-surface px-2 text-left text-body text-text-primary transition-all duration-180 ease-premium hover:bg-surface-hover"
        type="button"
        onClick={toggleOptions}
      >
        <span className="flex min-w-0 items-center gap-2">
          <img
            src={images.selectorIcon}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="truncate font-medium">
            {selectedMasterset?.name ?? "Select masterset"}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 mr-1 shrink-0 text-text-secondary"
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={optionsId}
            className="surface-card absolute left-0 right-0 top-full z-20 mt-2 grid origin-top gap-1 p-2"
            initial={{
              clipPath: "inset(0 0 100% 0 round 20px)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0 round 20px)",
              transition: {
                duration: 0.25,
              },
            }}
            exit={{
              clipPath: "inset(0 0 100% 0 round 20px)",
              transition: {
                duration: 0.15,
              },
            }}
          >
            {mastersetOptions.map((masterset) => {
              const isSelected = masterset.id === selectedMasterset?.id;

              return (
                <button
                  key={masterset.id}
                  className="flex h-11 items-center gap-3 rounded-button px-2 text-left text-sm font-medium text-text-primary transition-colors duration-180 ease-premium hover:bg-surface-hover"
                  type="button"
                  onClick={() => {
                    setSelectedMastersetId(masterset.id);
                    closeOptions();
                  }}
                >
                  <img
                    src={images.selectorIcon}
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-7 shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-1 truncate">
                    {masterset.name}
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
