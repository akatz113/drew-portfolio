export interface Project {
  id: string;
  title: string;
  category: "CAD" | "Robotics" | "Software";
  description: string;
  tags: string[];
  imageUrl?: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Autonomous Sorting Robot",
    category: "Robotics",
    description:
      "Designed and built a small-scale autonomous robot capable of sorting objects by color and size using computer vision and a custom gripper mechanism.",
    tags: ["ROS", "OpenCV", "SolidWorks", "3D Printing"],
  },
  {
    id: "project-2",
    title: "Lightweight Bracket Assembly",
    category: "CAD",
    description:
      "Performed FEA-driven topology optimization on a load-bearing bracket, reducing mass by 34% while maintaining structural safety factors above 2.5.",
    tags: ["SolidWorks", "ANSYS", "FEA", "GD&T"],
  },
  {
    id: "project-3",
    title: "Portfolio Site",
    category: "Software",
    description:
      "This very site — a dark-mode, glassmorphic portfolio built with Next.js, Tailwind CSS, and Framer Motion to showcase engineering and personal projects.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];
