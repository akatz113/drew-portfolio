"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function HobbiesTile() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link href="/interests">
        <GlassCard className="h-full flex flex-col justify-between gap-4 cursor-pointer hover:border-stone-600/60 transition-colors">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
            <Compass size={20} />
          </div>
          <div>
            <h3 className="text-stone-100 font-semibold mb-1">Personal Interests</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Books, travel, sports, climbing, and projects I've built for fun.
            </p>
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-sm font-medium">
            Explore <ArrowRight size={14} />
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
