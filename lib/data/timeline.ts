export interface Milestone {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  type: "education" | "work" | "project" | "home";
  link?: { label: string; href: string };
  imageUrl?: string;
}

export const milestones: Milestone[] = [
  {
    id: "milestone-1",
    date: "Through 2019",
    title: "Grew up in the Cleveland Area",
    location: "Chardon, Ohio",
    description:
      "Raised in Chardon, Ohio — a small town east of Cleveland. Graduated from Chardon High School and developed a lifelong loyalty to the Browns and Cavs, for better or worse.",
    type: "home",
    imageUrl: "/timeline/IMG_2427_cle.jpg",
  },
  {
    id: "milestone-2",
    date: "Aug 2019",
    title: "B.S. Mechanical Engineering — Ohio State",
    location: "Columbus, Ohio",
    description:
      "Enrolled at The Ohio State University to pursue a degree in Mechanical Engineering. Built a foundation in design, thermodynamics, manufacturing, and engineering analysis over four years.",
    type: "education",
    imageUrl: "/timeline/IMG_4313.jpeg",
  },
  {
    id: "milestone-3",
    date: "2021 – 2022",
    title: "Engineering Intern — GE Appliances",
    location: "Louisville, Kentucky",
    description:
      "Completed three internships at GE Appliances while attending Ohio State, gaining hands-on exposure to product development, manufacturing engineering, and large-scale appliance production.",
    type: "work",
    imageUrl: "/timeline/IMG_8107%201_ge_internship.JPG",
  },
  {
    id: "milestone-4",
    date: "May 2023",
    title: "Graduated Summa Cum Laude — The Ohio State University",
    location: "Columbus, Ohio",
    description:
      "Graduated Summa Cum Laude with a B.S. in Mechanical Engineering. Four years of coursework, internships, and projects pointed squarely toward a career at the intersection of engineering and technology.",
    type: "education",
    imageUrl: "/timeline/IMG_4042_graduation.JPG",
  },
  {
    id: "milestone-5",
    date: "2023 – Present",
    title: "Edison Engineering Program — GE Appliances",
    location: "Louisville, Kentucky",
    description:
      "Joined GE Appliances as an Edison Engineer, rotating across six roles in manufacturing, quality, AI, and product engineering. Concurrently pursuing an M.S. in Mechanical Engineering at the University of Louisville.",
    type: "work",
    imageUrl: "/timeline/IMG_9243_ge_employed.jpeg",
    link: { label: "See my rotations & projects", href: "/experience" },
  },
];
