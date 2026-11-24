"use client";

import { useEffect, useRef } from "react";
import { Tx, tr } from "@/lib/i18n";
import s from "./ZoomImage.module.css";

const CLOSE = tr("Close", "Cerrar");

/**
 * Full-screen viewer for case images (native <dialog>: traps focus, closes with Esc, a click
 * outside the content or the Close button, and returns focus to whatever opened it).
 * `aspect` (width / height) sizes the content as large as the screen allows, never smaller
 * than it was on the page.
 */
export default function Lightbox({
  open,
  onClose,
  aspect,
  children,
}: {
  open: boolean;
  onClose: () => void;
  aspect: number;
  children: React.ReactNode;
}) {
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={dlg}
      className={s.dialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className={s.frame} style={{ "--ar": aspect } as React.CSSProperties}>
          <button type="button" className={s.close} onClick={onClose} autoFocus>
            <Tx t={CLOSE} /> <span aria-hidden="true">×</span>
          </button>
          <div className={s.content}>{children}</div>
        </div>
      )}
    </dialog>
  );
}
