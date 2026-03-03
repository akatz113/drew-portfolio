export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number; // 1–5
  description: string;
  favoriteQuote: string;
}

export const books: Book[] = [
  {
    id: "book-1",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    coverUrl: "/covers/pragmatic-programmer.jpg",
    rating: 5,
    description:
      "A timeless guide to the craft of software development. Every chapter contains immediately actionable advice that changes how you think about code.",
    favoriteQuote:
      "You can't write perfect software. Did that hurt? It shouldn't. Accept it as an axiom of life.",
  },
  {
    id: "book-2",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverUrl: "/covers/design-of-everyday-things.jpg",
    rating: 5,
    description:
      "Norman's seminal work on human-centered design changed the way I approach every engineering decision — physical or digital.",
    favoriteQuote:
      "Design is really an act of communication, which means having a deep understanding of the person with whom the designer is communicating.",
  },
  {
    id: "book-3",
    title: "Surely You're Joking, Mr. Feynman!",
    author: "Richard P. Feynman",
    coverUrl: "/covers/feynman.jpg",
    rating: 5,
    description:
      "Part autobiography, part physics lesson, and entirely inspirational. Feynman's relentless curiosity is something I try to carry into every project.",
    favoriteQuote:
      "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
  },
  {
    id: "book-4",
    title: "Zero to One",
    author: "Peter Thiel",
    coverUrl: "/covers/zero-to-one.jpg",
    rating: 4,
    description:
      "A contrarian's guide to building something genuinely new. It reframes how I think about what's worth building and why.",
    favoriteQuote:
      "Every moment in business happens only once. The next Bill Gates will not build an operating system.",
  },
];
