"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export default function LightboxImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (imgError) return null;

  return (
    <>
      {/* Thumbnail */}
      <button
        onClick={() => setOpen(true)}
        className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-700/40 cursor-zoom-in"
        aria-label={`View ${alt} full size`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
          sizes="48px"
        />
      </button>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 p-6"
            onClick={() => setOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 text-stone-400 hover:text-stone-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Full-size image */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
