import BookshelfGrid from "@/components/library/BookshelfGrid";

export const metadata = {
  title: "Library — Drew Katz",
  description: "Books I've read, rated, and loved.",
};

export default function LibraryPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <BookshelfGrid />
    </section>
  );
}
