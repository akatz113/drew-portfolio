export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
}

export interface CurrentlyReadingBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

export const books: Book[] = [
  {
    id: "book-1",
    title: "The Big Print",
    author: "Lawrence Lepard",
    coverUrl: "/books/TheBigPrint_cover.png",

    description:
      "A thorough examination of decades of monetary expansion and its consequences. Lepard makes a compelling case for sound money principles and explains why hard assets matter in an era of endless printing.",
  },
  {
    id: "book-2",
    title: "The Little Book of Common Sense Investing",
    author: "John C. Bogle",
    coverUrl: "/books/CommonSenseInvesting_cover.png",

    description:
      "Bogle's timeless argument for low-cost index fund investing over active management. A simple yet powerful framework for building long-term wealth by getting out of your own way.",
  },
  {
    id: "book-3",
    title: "The Constitution of Liberty",
    author: "Friedrich Hayek",
    coverUrl: "https://covers.openlibrary.org/b/id/8151148-L.jpg",

    description:
      "Hayek's most comprehensive defense of classical liberalism. A rigorous philosophical argument for individual liberty, spontaneous order, and the rule of law over central planning.",
  },
  {
    id: "book-4",
    title: "Hayek for the 21st Century",
    author: "Thomas J. DiLorenzo",
    coverUrl: "/books/HayekForthe21stCentury.png",

    description:
      "DiLorenzo translates Hayek's foundational insights into the contemporary political and economic landscape, making his ideas immediately relevant to modern debates about markets and government.",
  },
  {
    id: "book-5",
    title: "Chaos Theory",
    author: "Bob Murphy",
    coverUrl: "https://covers.openlibrary.org/b/id/12678236-L.jpg",

    description:
      "Murphy examines how voluntary markets, not governments, are uniquely capable of providing law, security, and order — a thought-provoking challenge to the state monopoly on these services.",
  },
  {
    id: "book-7",
    title: "Outlive",
    author: "Peter Attia",
    coverUrl: "/books/Outlive.png",

    description:
      "Attia reframes longevity not as avoiding death but as maximizing the quality of your later decades. A rigorous, science-backed guide to exercise, nutrition, sleep, and emotional health that challenges nearly everything conventional medicine teaches about chronic disease.",
  },
  {
    id: "book-6",
    title: "Capitalism and Freedom",
    author: "Milton Friedman",
    coverUrl: "https://covers.openlibrary.org/b/id/140808-L.jpg",

    description:
      "Friedman's landmark work on the connection between economic freedom and political freedom. An indispensable case for free markets and limited government that remains as relevant as ever.",
  },
];

export const currentlyReading: CurrentlyReadingBook[] = [
  {
    id: "cr-1",
    title: "Human Action",
    author: "Ludwig Von Mises",
    coverUrl: "https://covers.openlibrary.org/b/id/5287720-L.jpg",
  },
  {
    id: "cr-2",
    title: "Breve Historia De Puerto Rico",
    author: "José Carlos Arroyo Muñoz",
    coverUrl: "/books/BreveHistoriaDePuertoRico_cover.png",
  },
  {
    id: "cr-3",
    title: "Lonesome Dove",
    author: "Larry McMurtry",
    coverUrl: "https://covers.openlibrary.org/b/id/8376548-L.jpg",
  },
];
