"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Book } from "@/lib/data/books";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showCover = book.coverUrl && !imgError;

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1000px", height: "320px" }}
      onClick={() => setIsFlipped((f) => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front — cover */}
        <div
          className="absolute inset-0 glass rounded-2xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex-1 bg-stone-800/60 flex items-center justify-center p-4">
            {showCover ? (
              <div className="relative w-20 h-28 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                  sizes="96px"
                />
              </div>
            ) : (
              <div className="w-20 h-28 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-600/30 border border-stone-700/50 flex items-center justify-center">
                <span className="text-stone-400 text-xs text-center px-2 leading-tight">{book.title}</span>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-stone-700/40">
            <p className="text-stone-100 text-sm font-semibold leading-tight line-clamp-1">{book.title}</p>
            <p className="text-stone-500 text-xs mt-0.5">{book.author}</p>
          </div>
          <div className="absolute bottom-2 right-3 text-stone-600 text-xs">tap to flip</div>
        </div>

        {/* Back — details */}
        <div
          className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="space-y-3">
            <p className="text-stone-300 text-xs leading-relaxed">{book.description}</p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
