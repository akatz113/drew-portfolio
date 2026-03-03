import { books, currentlyReading } from "@/lib/data/books";
import BookCard from "./BookCard";
import CurrentlyReadingCard from "./CurrentlyReadingCard";

export default function BookshelfGrid() {
  return (
    <div className="space-y-14">
      {/* Currently Reading */}
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-1">Currently Reading...</h2>
          <p className="text-zinc-400 text-sm">What&apos;s open on the nightstand right now.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {currentlyReading.map((book) => (
            <CurrentlyReadingCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* The Shelf */}
      <div className="space-y-5">
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
    </div>
  );
}
