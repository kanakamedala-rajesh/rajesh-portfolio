"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  headerIcon?: ReactNode;
  layoutId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  headerIcon,
  layoutId,
  className,
  style,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Also lock html for Lenis compatibility
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            layoutId={layoutId}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={cn(
              "bg-void relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/20 shadow-2xl",
              className
            )}
            style={style}
          >
            {/* Terminal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                {headerIcon || <Terminal className="text-primary h-4 w-4" />}
                <span className="font-mono text-xs text-white/60">
                  SYS_LOG :: {title.toUpperCase().replace(/\s+/g, "_")}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="text-white/60 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content with Scroll */}
            <div
              className="flex-1 overflow-y-auto p-6 md:p-10"
              data-lenis-prevent // Prevent Lenis from hijacking scroll here
            >
              {/* Title Section */}
              <div className="mb-8">
                <div className="mb-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
                    {title}
                  </h2>
                  {subtitle && (
                    <span className="bg-primary/10 text-primary rounded px-3 py-1 font-mono text-sm">
                      {subtitle}
                    </span>
                  )}
                </div>
              </div>

              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
