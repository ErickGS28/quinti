"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  closeLabel: string;
  /** When false the sheet cannot be dismissed, for example while a transaction is pending. */
  dismissible?: boolean;
  children: ReactNode;
};

/**
 * Bottom sheet on phones, centered card on larger screens. Built on the native dialog element,
 * which already provides focus trapping, Escape to close and inert background.
 */
export function Sheet({ open, onClose, title, description, closeLabel, dismissible = true, children }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="sheet w-full max-w-lg rounded-t-sheet bg-cloud-raised p-0 text-ink shadow-float sm:rounded-sheet"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible) onClose();
      }}
      onClick={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-xl font-semibold tracking-tight">
                {title}
              </h2>
              {description && <p className="mt-1.5 text-ink-soft">{description}</p>}
            </div>
            {dismissible && (
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-hairline"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="mt-6">{children}</div>
        </div>
      )}
    </dialog>
  );
}
