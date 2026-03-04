import { TrendingUp, Lock } from "lucide-react";
import type { Rotation } from "@/lib/data/experience";

interface Props {
  rotation: Rotation;
}

export default function RotationCard({ rotation }: Props) {
  const { number, title, department, period, description, project, results, skills, isCurrent, isUpcoming } = rotation;

  if (isUpcoming) {
    return (
      <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden opacity-50 border border-dashed border-stone-700">
        <span className="absolute top-4 right-6 text-7xl font-black text-stone-700/20 font-mono select-none leading-none">
          {String(number).padStart(2, "0")}
        </span>
        <div className="flex items-center justify-between gap-4 relative">
          <div>
            <p className="text-stone-600 text-xs font-mono uppercase tracking-wider mb-1.5">
              Rotation {number} · {period}
            </p>
            <h3 className="text-lg font-bold text-stone-500 leading-tight">Upcoming Rotation</h3>
            <p className="text-stone-600 text-sm mt-0.5">Assignment not yet determined</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-medium text-stone-500 bg-stone-800/40 border border-stone-700/50 px-2.5 py-1 rounded-full">
            <Lock size={10} />
            Upcoming
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
      {/* Large background rotation number */}
      <span className="absolute top-4 right-6 text-7xl font-black text-stone-700/30 font-mono select-none leading-none">
        {String(number).padStart(2, "0")}
      </span>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5 relative">
        <div>
          <p className="text-amber-400/70 text-xs font-mono uppercase tracking-wider mb-1.5">
            Rotation {number} · {period}
          </p>
          <h3 className="text-xl font-bold text-stone-100 leading-tight">{title}</h3>
          <p className="text-stone-500 text-sm mt-0.5">{department}</p>
        </div>
        {isCurrent && (
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
            </span>
            Current
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-stone-400 text-sm leading-relaxed mb-6 relative">{description}</p>

      {/* Key Project */}
      <div className="border-l-2 border-amber-500/40 pl-4 py-3 pr-4 bg-amber-500/[0.03] rounded-r-xl mb-5">
        <p className="text-amber-400/60 text-xs font-mono uppercase tracking-wider mb-1.5">Key Project</p>
        <p className="text-stone-200 text-sm font-semibold mb-1">{project.title}</p>
        <p className="text-stone-400 text-sm leading-relaxed">{project.description}</p>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-amber-500/[0.05] border border-amber-500/15 rounded-xl px-4 py-3 mb-5">
          <p className="text-amber-400/60 text-xs font-mono uppercase tracking-wider mb-2.5">Results</p>
          <ul className="space-y-1.5">
            {results.map((result, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-300 text-sm">
                <TrendingUp size={14} className="text-amber-400 mt-0.5 shrink-0" />
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs text-stone-500 bg-stone-800/60 border border-stone-700/50 px-2.5 py-0.5 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
