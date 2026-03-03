export interface Milestone {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  type: "education" | "work" | "project";
}

export const milestones: Milestone[] = [
  {
    id: "milestone-1",
    date: "Aug 2022",
    title: "Started at [University]",
    location: "[City, State]",
    description:
      "Began pursuing a B.S. in Mechanical Engineering. Joined the robotics club and the engineering honors society in the first semester.",
    type: "education",
  },
  {
    id: "milestone-2",
    date: "May 2023",
    title: "Engineering Intern — [Company A]",
    location: "[City, State]",
    description:
      "Completed a summer internship supporting the mechanical design team. Owned the redesign of a production fixture, reducing assembly time by 20%.",
    type: "work",
  },
  {
    id: "milestone-3",
    date: "Jan 2024",
    title: "Capstone Project Kick-off",
    location: "[University]",
    description:
      "Led a team of four to design and prototype a low-cost assistive device for individuals with limited hand mobility. Presented at the departmental expo.",
    type: "project",
  },
  {
    id: "milestone-4",
    date: "May 2024",
    title: "Engineering Intern — [Company B]",
    location: "[City, State]",
    description:
      "Returned for a second internship with a focus on product development. Ran tolerance stack-up analyses and contributed to DFM reviews.",
    type: "work",
  },
  {
    id: "milestone-5",
    date: "Present",
    title: "Senior Year & Current Role",
    location: "[City, State]",
    description:
      "Finishing up my degree while working part-time. Actively building projects at the intersection of mechanical engineering and software.",
    type: "education",
  },
];
