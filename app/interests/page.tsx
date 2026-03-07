"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Plane, Trophy, Mountain, Wrench, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const interests = [
  {
    href: "/library",
    icon: BookOpen,
    color: "amber",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    arrowText: "text-amber-400",
    title: "My Library",
    description: "What I'm currently reading and some of my favorite books.",
    cta: "Browse the shelf",
  },
  {
    href: "/interests/travel",
    icon: Plane,
    color: "sky",
    iconBg: "bg-sky-500/10",
    iconText: "text-sky-400",
    arrowText: "text-sky-400",
    title: "Travel & Trips",
    description: "Photo albums and memories from trips that I've taken.",
    cta: "See the albums",
  },
  {
    href: "/interests/sports",
    icon: Trophy,
    color: "emerald",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    arrowText: "text-emerald-400",
    title: "Sports",
    description: "Sports teams that I support.",
    cta: "Check it out",
  },
  {
    href: "/interests/climbing",
    icon: Mountain,
    color: "orange",
    iconBg: "bg-orange-500/10",
    iconText: "text-orange-400",
    arrowText: "text-orange-400",
    title: "Adventures",
    description: "Rock climbing, backpacking, and cycling trips.",
    cta: "See the adventures",
  },
  {
    href: "/interests/projects",
    icon: Wrench,
    color: "violet",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-400",
    arrowText: "text-violet-400",
    title: "Personal Projects",
    description: "Some projects I've worked on in my free time.",
    cta: "See what I've built",
  },
];

export default function InterestsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-amber-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          In my free time
        </p>
        <h1 className="text-4xl font-bold text-stone-100 mb-2">Personal Interests</h1>
        <p className="text-stone-400 text-lg">
          My favorite hobbies, activities, and some photos from traveling that I've done over the years.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {interests.map(({ href, icon: Icon, iconBg, iconText, arrowText, title, description, cta }) => (
          <motion.div
            key={href}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={href}>
              <GlassCard className="h-full flex flex-col justify-between gap-4 cursor-pointer hover:border-stone-600/60 transition-colors">
                <div className={`p-2.5 rounded-xl ${iconBg} ${iconText} w-fit`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-stone-100 font-semibold mb-1">{title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{description}</p>
                </div>
                <div className={`flex items-center gap-1 ${arrowText} text-sm font-medium`}>
                  {cta} <ArrowRight size={14} />
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
