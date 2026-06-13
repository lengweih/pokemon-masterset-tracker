import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, MouseEvent as ReactMouseEvent } from "react";
import { Upload, X } from "lucide-react";

import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import {
  applyCollectionBackup,
  hasExistingCollectionData,
  parseCollectionBackup,
  type CollectionBackup,
} from "../../lib/collectionBackup";

interface ImportCollectionModalProps {
  onClose: () => void;
}

export function ImportCollectionModal({ onClose }: ImportCollectionModalProps) {
  useBodyScrollLock();

  const [jsonText, setJsonText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingBackup, setPendingBackup] = useState<CollectionBackup | null>(
    null,
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setJsonText(typeof reader.result === "string" ? reader.result : "");
    };
    reader.onerror = () => {
      setFileName(null);
      setError("Couldn't read that file. Try again or paste the JSON below.");
    };
    reader.readAsText(file);
  };

  const applyAndClose = (backup: CollectionBackup) => {
    // applyCollectionBackup dispatches the localStorage sync event, so live
    // consumers (collection page, dashboard stats, nav progress) update in
    // place — no reload needed; just close the modal.
    applyCollectionBackup(backup);
    onClose();
  };

  const handleImport = () => {
    const backup = parseCollectionBackup(jsonText);
    if (!backup) {
      setError(
        "That doesn't look like a valid backup. Upload or paste a file exported from this app.",
      );
      return;
    }

    if (hasExistingCollectionData()) {
      setPendingBackup(backup);
      return;
    }

    applyAndClose(backup);
  };

  const handleBackdropMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (pendingBackup) {
    return (
      <div
        className="modal-backdrop"
        role="presentation"
        onMouseDown={handleBackdropMouseDown}
      >
        <section
          aria-labelledby="import-confirm-title"
          aria-modal="true"
          className="modal-panel p-5 xs:p-7"
          role="dialog"
        >
          <h2
            id="import-confirm-title"
            className="text-[22px] font-semibold leading-tight text-text-primary"
          >
            Replace existing data?
          </h2>
          <p className="mt-3 text-sm font-medium leading-[1.6] text-text-secondary">
            You already have collection or wishlist data saved. Importing this
            backup will replace it, and this can&apos;t be undone.
          </p>

          <div className="mt-6 grid gap-3 xs:grid-cols-2">
            <button
              className="flex h-12 items-center justify-center rounded-button border border-border-strong bg-surface px-5 text-body text-text-primary transition-colors duration-180 ease-premium hover:bg-surface-hover"
              type="button"
              onClick={() => {
                setPendingBackup(null);
              }}
            >
              Cancel
            </button>
            <button
              className="flex h-12 items-center justify-center rounded-button bg-danger px-5 text-body font-semibold text-white transition-all duration-180 ease-premium hover:brightness-[1.03]"
              type="button"
              onClick={() => {
                applyAndClose(pendingBackup);
              }}
            >
              Replace data
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        aria-labelledby="import-title"
        aria-modal="true"
        className="modal-panel max-h-[calc(100vh-2rem)] overflow-y-auto p-5 xs:p-7"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              id="import-title"
              className="text-[22px] font-semibold leading-tight text-text-primary"
            >
              Import Collection
            </h2>
            <p className="mt-1 text-sm font-medium leading-[1.5] text-text-secondary">
              Upload a backup file or paste its JSON below.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            aria-label="Close import"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-button text-text-secondary transition-colors duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-button border border-border-strong bg-surface px-4 text-sm font-semibold text-text-primary transition-colors duration-180 ease-premium hover:bg-surface-hover">
            <input
              accept="application/json,.json"
              className="sr-only"
              type="file"
              onChange={handleFileChange}
            />
            <Upload aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            Choose file
          </label>
          {fileName ? (
            <span className="min-w-0 truncate text-sm font-medium text-text-secondary">
              {fileName}
            </span>
          ) : null}
        </div>

        <textarea
          aria-label="Backup JSON"
          className="mt-3 h-40 w-full resize-none rounded-button border border-border-strong bg-surface p-3 font-mono text-xs leading-relaxed text-text-primary transition-colors duration-180 ease-premium placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.12]"
          placeholder={
            'Paste backup JSON, e.g. {"version":1,"sets":{"prismatic-evolutions":{"collection":{...},"wishlist":[...]}}}'
          }
          value={jsonText}
          onChange={(event) => {
            setJsonText(event.target.value);
            setError(null);
          }}
        />

        {error ? (
          <p className="mt-2 text-sm font-medium text-danger">{error}</p>
        ) : null}

        <div className="mt-6 grid gap-3 xs:grid-cols-2">
          <button
            className="flex h-12 items-center justify-center rounded-button border border-border-strong bg-surface px-5 text-body text-text-primary transition-colors duration-180 ease-premium hover:bg-surface-hover"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex h-12 items-center justify-center rounded-button bg-gradient-brand px-5 text-body font-semibold text-white transition-all duration-180 ease-premium hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={jsonText.trim().length === 0}
            type="button"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
      </section>
    </div>
  );
}
