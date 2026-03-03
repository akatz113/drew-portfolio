import { milestones } from "@/lib/data/timeline";
import TimelineNode from "./TimelineNode";

export default function Timeline() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-1">The Journey</h2>
        <p className="text-zinc-400 text-sm">Key milestones — school, work, and projects along the way.</p>
      </div>

      <div className="relative">
        {/* Central vertical line */}
        <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-zinc-700/60" />

        <div className="relative py-4">
          {milestones.map((milestone, i) => (
            <TimelineNode key={milestone.id} milestone={milestone} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
