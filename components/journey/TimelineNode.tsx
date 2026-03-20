"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import type { Milestone } from "@/lib/data/timeline";
import LightboxImage from "@/components/ui/LightboxImage";

interface TimelineNodeProps {
  milestone: Milestone;
  index: number;
}

const typeConfig = {
  home:      { color: "bg-amber-400",  label: "Hometown",  badge: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  education: { color: "bg-blue-400",   label: "Education", badge: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  work:      { color: "bg-green-400",  label: "Work",      badge: "bg-green-500/15 text-green-400 border-green-500/20" },
  project:   { color: "bg-purple-400", label: "Project",   badge: "bg-purple-500/15 text-purple-400 border-purple-500/20" },
};

export default function TimelineNode({ milestone, index }: TimelineNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const config = typeConfig[milestone.type];

  return (
    <div ref={ref} className="relative flex items-center mb-12 last:mb-0">
      {/* Center dot — hidden on mobile to avoid overlapping cards */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
        <div className={`w-3 h-3 rounded-full ${config.color} ring-4 ring-stone-800`} />
      </div>

      {/* Card — alternates left/right on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -48 : 48 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        className={`w-full md:w-[calc(50%-2rem)] glass rounded-2xl p-5 ${
          isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        {/* Header: thumbnail + date/title + badge */}
        <div className="flex items-start gap-3 mb-3">
          {milestone.imageUrl && (
            <LightboxImage src={milestone.imageUrl} alt={milestone.title} />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-stone-500 text-xs font-mono mb-1">{milestone.date}</p>
                <h3 className="text-stone-100 font-semibold text-base leading-tight">{milestone.title}</h3>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${config.badge}`}>
                {config.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-3">
          <MapPin size={12} />
          {milestone.location}
        </div>

        <p className="text-stone-400 text-sm leading-relaxed">{milestone.description}</p>

        {milestone.link && (
          <Link
            href={milestone.link.href}
            className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs font-medium mt-3 transition-colors"
          >
            {milestone.link.label}
            <ArrowRight size={11} />
          </Link>
        )}
      </motion.div>
    </div>
  );
}
