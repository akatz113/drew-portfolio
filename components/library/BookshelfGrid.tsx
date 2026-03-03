import { books } from "@/lib/data/books";
import BookCard from "./BookCard";

export default function BookshelfGrid() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-1">The Shelf</h2>
        <p className="text-zinc-400 text-sm">Books I&apos;ve read — click any card to flip it for my take.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
