"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { CurrentlyReadingBook } from "@/lib/data/books";

interface Props {
  book: CurrentlyReadingBook;
}

export default function CurrentlyReadingCard({ book }: Props) {
  const [imgError, setImgError] = useState(false);

  const showCover = book.coverUrl && !imgError;

  return (
    <div className="relative glass rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_24px_rgba(245,158,11,0.07)] p-5 flex flex-col gap-4">
      {/* In-progress indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
        </span>
        <span className="text-amber-400/80 text-xs font-medium tracking-wide uppercase">
          In Progress
        </span>
      </div>

      {/* Book visual */}
      <div className="flex-1 flex items-center justify-center py-2">
        {showCover ? (
          <div className="relative w-20 h-28 rounded-lg overflow-hidden shadow-md">
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="80px"
            />
          </div>
        ) : (
          <div className="w-20 h-28 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/20 flex items-center justify-center">
            <BookOpen size={24} className="text-amber-500/60" />
          </div>
        )}
      </div>

      {/* Title + Author */}
      <div>
        <p className="text-stone-100 text-sm font-semibold leading-tight">{book.title}</p>
        <p className="text-stone-500 text-xs mt-0.5">{book.author}</p>
      </div>
    </div>
  );
}
