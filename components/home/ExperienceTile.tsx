import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { rotations } from "@/lib/data/experience";

export default function ExperienceTile() {
  return (
    <Link href="/experience" className="block h-full group">
      <GlassCard className="h-full flex items-center justify-between gap-6 hover:border-amber-500/20 transition-colors">
        {/* Left: label + title */}
        <div className="min-w-0">
          <p className="text-xs text-stone-500 font-mono tracking-widest uppercase mb-1">Work</p>
          <h3 className="text-stone-100 font-semibold text-lg leading-tight mb-1">
            Edison Engineering Program
          </h3>
          <p className="text-stone-400 text-sm">GE Appliances · 6 Rotations · M.S. Mechanical Engineering</p>
        </div>

        {/* Center: rotation step indicators */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {rotations.map((r) => (
            <div
              key={r.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                r.isCurrent
                  ? "bg-amber-500/25 border border-amber-500/60 text-amber-300"
                  : r.isUpcoming
                  ? "border border-dashed border-stone-700/50 text-stone-700"
                  : "bg-stone-800/60 border border-stone-700/50 text-stone-500"
              }`}
            >
              {r.number}
            </div>
          ))}
          <div className="h-px w-3 bg-stone-700/30" />
          <div className="flex items-center gap-1 border border-dashed border-stone-700/50 rounded-full px-2 py-1 text-stone-600">
            <GraduationCap size={13} />
            <span className="text-xs">2027</span>
          </div>
        </div>

        {/* Right: arrow */}
        <ArrowRight
          size={18}
          className="text-stone-600 group-hover:text-amber-400 transition-colors shrink-0"
        />
      </GlassCard>
    </Link>
  );
}
