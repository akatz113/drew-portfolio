import GlassCard from "@/components/ui/GlassCard";

const skillGroups = [
  {
    label: "Engineering Design",
    skills: ["Dimensional Control", "GD&T", "CAD Modeling"],
  },
  {
    label: "Software & AI",
    skills: ["Python", "React / Node.js", "AI Productivity Tools"],
  },
  {
    label: "Data & Analytics",
    skills: ["SQL", "BigQuery", "SAS", "Power Platform"],
  },
];

export default function SkillsTile() {
  return (
    <GlassCard className="h-full flex flex-col gap-4">
      <p className="text-xs text-stone-500 font-mono tracking-widest uppercase">Skills</p>
      <div className="flex flex-col gap-3">
        {skillGroups.map(({ label, skills }) => (
          <div key={label}>
            <p className="text-xs text-stone-500 mb-1.5">{label}</p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md bg-stone-700/50 border border-stone-600/40 text-stone-300 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
