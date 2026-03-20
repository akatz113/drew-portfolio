import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import BookshelfGrid from "@/components/library/BookshelfGrid";

export const metadata = {
  title: "Library — Drew Katz",
  description: "Books I've read, rated, and loved.",
};

export default function LibraryPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/interests" className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-300 text-sm transition-colors mb-6">
        <ChevronLeft size={15} />
        Interests
      </Link>
      <BookshelfGrid />
    </section>
  );
}
