"use client";

import { motion } from "framer-motion";
import { Mountain } from "lucide-react";
import { adventures } from "@/lib/data/interests";
import AdventureCard from "@/components/interests/AdventureCard";

export default function AdventuresPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-orange-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          <Mountain size={12} />
          Personal Interests
        </div>
        <h1 className="text-4xl font-bold text-stone-100 mb-2">Adventures</h1>
        <p className="text-stone-400 text-lg">
          Rock climbing, cycling expeditions, and the outdoors that keep life interesting.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
          hidden: {},
        }}
      >
        {adventures.map((adventure, i) => (
          <AdventureCard key={adventure.id} adventure={adventure} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
