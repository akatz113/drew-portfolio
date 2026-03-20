import { Briefcase, GraduationCap } from "lucide-react";
import { program, rotations } from "@/lib/data/experience";
import RotationCard from "@/components/experience/RotationCard";

export default function ExperiencePage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 space-y-10">

      {/* Program Header */}
      <div>
        <div className="flex items-center gap-2 text-amber-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          <Briefcase size={12} />
          3-Year Rotational Program · 6 Rotations
        </div>
        <h1 className="text-4xl font-bold text-stone-100 mb-1">{program.name}</h1>
        <p className="text-stone-400 text-lg">{program.company} · {program.location}</p>

        {/* Master's badge */}
        <div className="flex items-center gap-3 mt-5 glass rounded-xl px-5 py-3.5 w-fit">
          <GraduationCap size={18} className="text-amber-400 shrink-0" />
          <div>
            <p className="text-stone-200 text-sm font-semibold">{program.masters.degree}</p>
            <p className="text-stone-500 text-xs mt-0.5">
              {program.masters.university} · Expected {program.masters.expectedGraduation}
            </p>
          </div>
        </div>
      </div>

      {/* Rotation progress track */}
      <div className="flex items-center gap-1 sm:gap-2">
        {rotations.map((r, i) => (
          <div key={r.id} className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
            <div
              className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border whitespace-nowrap ${
                r.isCurrent
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                  : r.isUpcoming
                  ? "bg-transparent border-stone-700/50 border-dashed text-stone-600"
                  : "bg-stone-800/60 border-stone-700/50 text-stone-500"
              }`}
            >
              {r.isCurrent && (
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                </span>
              )}
              R{r.number}
            </div>
            {i < rotations.length - 1 && (
              <div className={`h-px flex-1 ${r.isUpcoming ? "bg-stone-700/30" : "bg-stone-700/40"}`} />
            )}
          </div>
        ))}

        {/* Graduation cap at the end */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="h-px w-2 sm:w-4 bg-stone-700/30" />
          <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border border-dashed border-stone-700/50 text-stone-600 whitespace-nowrap">
            <GraduationCap size={11} />
            <span className="hidden sm:inline">Aug 2027</span>
            <span className="sm:hidden">&#39;27</span>
          </div>
        </div>
      </div>

      {/* Completed / Current Rotation Cards — most recent first */}
      <div className="space-y-6">
        {[...rotations].filter((r) => !r.isUpcoming).reverse().map((rotation) => (
          <RotationCard key={rotation.id} rotation={rotation} />
        ))}
      </div>

      {/* Upcoming section divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-stone-700/40" />
        <span className="text-stone-500 text-xs font-mono uppercase tracking-wider whitespace-nowrap">Upcoming</span>
        <div className="h-px flex-1 bg-stone-700/40" />
      </div>

      {/* Upcoming Rotations + Graduation */}
      <div className="space-y-6">
        {rotations.filter((r) => r.isUpcoming).map((rotation) => (
          <RotationCard key={rotation.id} rotation={rotation} />
        ))}

        {/* Graduation milestone */}
        <div className="flex items-center gap-4 glass rounded-2xl px-6 py-5 border border-dashed border-stone-700/60 opacity-50">
          <GraduationCap size={22} className="text-stone-500 shrink-0" />
          <div>
            <p className="text-stone-400 text-sm font-semibold">M.S. Mechanical Engineering</p>
            <p className="text-stone-600 text-xs mt-0.5">
              {program.masters.university} · Expected {program.masters.expectedGraduation}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
