"use client";

import { motion, type Variants } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroTile() {
  return (
    <GlassCard className="relative overflow-hidden flex flex-col justify-end min-h-[280px] lg:min-h-full">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5 pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 space-y-3"
      >
        <motion.p variants={item} className="text-stone-400 text-sm font-mono tracking-widest uppercase">
          Hey, I&apos;m
        </motion.p>
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl font-bold text-white leading-tight"
        >
          Drew Katz
        </motion.h1>
        <motion.p
          variants={item}
          className="text-xl sm:text-2xl font-medium text-amber-300"
        >
          Mechanical Engineer &amp; Builder
        </motion.p>
        <motion.p
          variants={item}
          className="text-stone-400 text-sm sm:text-base max-w-sm leading-relaxed"
        >
          I design physical systems, build software tools, and find the
          intersection between the two wherever I can.
        </motion.p>
      </motion.div>
    </GlassCard>
  );
}
