"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Book } from "@/lib/data/books";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

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
          <div className="flex-1 bg-zinc-800/60 flex items-center justify-center p-4">
            {/* Cover placeholder — replace with <Image> once you have real covers */}
            <div className="w-24 h-32 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border border-zinc-700/50 flex items-center justify-center">
              <span className="text-zinc-400 text-xs text-center px-2 leading-tight">{book.title}</span>
            </div>
          </div>
          <div className="p-4 border-t border-zinc-700/40">
            <p className="text-zinc-100 text-sm font-semibold leading-tight line-clamp-1">{book.title}</p>
            <p className="text-zinc-500 text-xs mt-0.5">{book.author}</p>
            <div className="flex items-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < book.rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-2 right-3 text-zinc-600 text-xs">tap to flip</div>
        </div>

        {/* Back — details */}
        <div
          className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < book.rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"}
                />
              ))}
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">{book.description}</p>
          </div>

          <blockquote className="border-l-2 border-indigo-500/60 pl-3 mt-2">
            <p className="text-zinc-400 text-xs italic leading-relaxed line-clamp-4">
              &ldquo;{book.favoriteQuote}&rdquo;
            </p>
          </blockquote>
        </div>
      </motion.div>
    </div>
  );
}
