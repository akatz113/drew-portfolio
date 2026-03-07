"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface Props {
  album: string;
  title: string;
  subtitle?: string;
  description: string;
  cities?: string[];
  accentColor?: string;
  onClose: () => void;
}

export default function PhotoModal({
  album,
  title,
  subtitle,
  description,
  cities,
  accentColor = "#38bdf8",
  onClose,
}: Props) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/photos/${album}`)
      .then((r) => r.json())
      .then((files: string[]) => {
        setPhotos(files);
        setLoading(false);
      });
  }, [album]);

  const prev = useCallback(
    () =>
      setCurrent((i) => {
        setImgLoaded(false);
        return (i - 1 + photos.length) % photos.length;
      }),
    [photos.length]
  );

  const next = useCallback(
    () =>
      setCurrent((i) => {
        setImgLoaded(false);
        return (i + 1) % photos.length;
      }),
    [photos.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-stone-950/95 p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="glass-strong rounded-2xl w-full max-w-5xl flex flex-col overflow-hidden"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
          <div className="flex-1 min-w-0">
            {subtitle && (
              <p
                className="text-xs font-mono uppercase tracking-widest mb-1"
                style={{ color: accentColor }}
              >
                {subtitle}
              </p>
            )}
            <h2 className="text-2xl font-bold text-stone-100 truncate">{title}</h2>

            {cities && cities.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mt-2">
                {cities.map((city, i) => (
                  <span key={city} className="flex items-center gap-1">
                    {i === 0 && <MapPin size={10} className="text-stone-500" />}
                    {i > 0 && <span className="text-stone-600 text-xs">→</span>}
                    <span className="text-stone-400 text-xs">{city}</span>
                  </span>
                ))}
              </div>
            )}

            <p className="text-stone-400 text-sm leading-relaxed mt-3 max-w-2xl line-clamp-3">
              {description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="ml-4 shrink-0 p-2 rounded-xl text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Photo area */}
        <div className="flex-1 min-h-0 flex flex-col">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-6 h-6 border-2 border-stone-600 border-t-stone-300 rounded-full animate-spin" />
            </div>
          ) : photos.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-stone-500 text-sm">
              No photos found
            </div>
          ) : (
            <>
              {/* Main photo */}
              <div className="relative flex items-center justify-center flex-1 min-h-0 px-14 py-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imgLoaded ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center w-full h-full"
                    style={{ minHeight: "280px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/photos/${album}/${photos[current]}`}
                      alt={`Photo ${current + 1} of ${photos.length}`}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                      style={{ maxHeight: "50vh" }}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgLoaded(true)}
                    />
                  </motion.div>
                </AnimatePresence>

                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-stone-600 border-t-stone-300 rounded-full animate-spin" />
                  </div>
                )}

                {/* Prev/Next buttons */}
                <button
                  onClick={prev}
                  className="absolute left-3 p-2.5 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors backdrop-blur-sm"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 p-2.5 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors backdrop-blur-sm"
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="px-6 pb-5 pt-3 shrink-0">
                <p className="text-stone-600 text-xs text-center mb-2.5 font-mono">
                  {current + 1} / {photos.length}
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide justify-center">
                  {photos.map((photo, i) => (
                    <button
                      key={photo}
                      onClick={() => {
                        setImgLoaded(false);
                        setCurrent(i);
                      }}
                      className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 transition-all"
                      style={{
                        opacity: i === current ? 1 : 0.4,
                        outline: i === current ? `2px solid ${accentColor}` : "none",
                        outlineOffset: "2px",
                      }}
                      aria-label={`Go to photo ${i + 1}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/photos/${album}/${photo}`}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
