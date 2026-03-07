"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, Bike } from "lucide-react";
import { Adventure } from "@/lib/data/interests";
import PhotoModal from "./PhotoModal";

interface Props {
  adventure: Adventure;
  index: number;
}

export default function AdventureCard({ adventure, index }: Props) {
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/photos/${adventure.album}`)
      .then((r) => r.json())
      .then((files: string[]) => {
        if (files.length > 0) setCoverPhoto(files[0]);
      })
      .catch(() => {});
  }, [adventure.album]);

  const Icon = adventure.type === "cycling" ? Bike : Mountain;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="group w-full text-left glass rounded-2xl overflow-hidden border border-stone-700/50 hover:border-stone-600/70 transition-all duration-300"
        >
          {/* Cover image */}
          <div className="relative h-48 bg-stone-900 overflow-hidden">
            {coverPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/api/photos/${adventure.album}/${coverPhoto}`}
                alt={adventure.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center opacity-20"
                style={{ backgroundColor: adventure.accentColor + "22" }}
              >
                <Icon size={40} style={{ color: adventure.accentColor }} />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

            {/* Type badge */}
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
              style={{
                backgroundColor: adventure.accentColor + "22",
                color: adventure.accentColor,
                border: `1px solid ${adventure.accentColor}33`,
              }}
            >
              <Icon size={11} />
              {adventure.type === "cycling" ? "Cycling" : "Rock Climbing"}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-stone-500 text-xs font-mono uppercase tracking-wider mb-1">
              {adventure.location}
            </p>
            <h3 className="text-stone-100 font-semibold text-lg mb-2">
              {adventure.title}
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed line-clamp-3">
              {adventure.description}
            </p>

            <div
              className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-all"
              style={{ color: adventure.accentColor }}
            >
              <span className="group-hover:underline">View album</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <PhotoModal
            album={adventure.album}
            title={adventure.title}
            subtitle={adventure.location}
            description={adventure.description}
            accentColor={adventure.accentColor}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
