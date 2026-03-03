"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { projects } from "@/lib/data/projects";

const categoryColors: Record<string, string> = {
  CAD: "bg-sky-500/15 text-sky-400 border border-sky-500/20",
  Robotics: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  Software: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
};

export default function ProjectRolodex() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % projects.length);
  };

  const project = projects[currentIndex];

  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-stone-500 font-mono tracking-widest uppercase mb-1">Projects</p>
          <p className="text-stone-400 text-xs">
            {currentIndex + 1} / {projects.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-700/50 transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-700/50 transition-colors"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[120px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[project.category]}`}>
                {project.category}
              </span>
            </div>
            <h3 className="text-stone-100 font-semibold text-lg leading-tight">
              {project.title}
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-stone-500 bg-stone-800/60 border border-stone-700/50 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5 mt-auto">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-4 bg-amber-400" : "w-1.5 bg-stone-600"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </GlassCard>
  );
}
