import { useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import type { CollectionViewId } from "../../types/collection";
import {
  COLLECTION_TAB_PANEL_ID,
  getCollectionTabId,
} from "./collectionTabPanel";

interface CollectionTab {
  id: CollectionViewId;
  label: string;
}

interface CollectionTabsProps {
  activeTab: CollectionViewId;
  onTabChange: (tab: CollectionViewId) => void;
}

const collectionTabs = [
  {
    id: "master",
    label: "Master Set",
  },
  {
    id: "grandmaster",
    label: "Grandmaster Set",
  },
] satisfies readonly CollectionTab[];

export function CollectionTabs({
  activeTab,
  onTabChange,
}: CollectionTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTabAtIndex = (index: number) => {
    const nextIndex = (index + collectionTabs.length) % collectionTabs.length;
    const nextTab = collectionTabs[nextIndex];

    onTabChange(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTabAtIndex(index + 1);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTabAtIndex(index - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTabAtIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTabAtIndex(collectionTabs.length - 1);
    }
  };

  return (
    <div className="rounded-button border border-border-strong bg-surface px-3">
      <div
        aria-label="Collection view"
        className="flex min-w-0 overflow-x-auto"
        role="tablist"
      >
        {collectionTabs.map((tab, index) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              aria-controls={COLLECTION_TAB_PANEL_ID}
              aria-selected={isActive}
              className={[
                "relative h-14 shrink-0 px-4 text-label transition-colors duration-180 ease-premium 2xs:text-[15px] xs:px-6",
                isActive
                  ? "text-primary"
                  : "text-text-secondary hover:text-text-primary",
              ].join(" ")}
              id={getCollectionTabId(tab.id)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
              onKeyDown={(event) => {
                handleTabKeyDown(event, index);
              }}
              onClick={() => {
                onTabChange(tab.id);
              }}
            >
              {tab.label}
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-pill bg-gradient-brand"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
