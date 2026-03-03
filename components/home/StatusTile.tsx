import { GraduationCap, Briefcase } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function StatusTile() {
  return (
    <GlassCard className="flex flex-col justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
        </span>
        <span className="text-xs text-zinc-400 font-mono tracking-widest uppercase">Currently Active</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
            <GraduationCap size={16} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">University</p>
            <p className="text-zinc-100 text-sm font-medium">[Your University]</p>
            <p className="text-zinc-400 text-xs">Mechanical Engineering, B.S.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400 mt-0.5">
            <Briefcase size={16} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Workplace</p>
            <p className="text-zinc-100 text-sm font-medium">[Your Company]</p>
            <p className="text-zinc-400 text-xs">Engineering Intern</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
