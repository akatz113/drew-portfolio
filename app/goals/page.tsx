import { Ruler, Sparkles, Users } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export const metadata = {
  title: "Goals — Drew Katz",
  description: "Professional goals and areas of growth I'm committed to.",
};

const goals = [
  {
    icon: Ruler,
    iconBg: "bg-sky-500/10",
    iconText: "text-sky-400",
    category: "Engineering Design",
    title: "Dimensional Control",
    body: "Strong part design starts with a shared language. I'm working toward my GDT-PT certification to formalize my understanding of tolerancing principles and communicate design intent more precisely across engineering and manufacturing teams.",
    milestone: {
      label: "GDT-PT Certification",
      className: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    },
  },
  {
    icon: Sparkles,
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-400",
    category: "Software & AI",
    title: "Applied AI",
    body: "Since the earliest wave of practical AI tools, I've made it a habit to put them to work — from building this site to rethinking how I approach problems day to day. My goal isn't to chase certifications here, but to stay genuinely curious, keep experimenting, and find ways to use AI to remove friction and open up possibilities that wouldn't otherwise exist.",
    milestone: null,
  },
  {
    icon: Users,
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    category: "Career Development",
    title: "Leadership",
    body: "I've always been goal-driven, but my favorite moments in my career have come from working alongside teams where everyone is fully bought in on a hard problem. I want to keep developing as a leader by seeking out difficult roles, staying coachable, and learning from the people around me. The best way I know to grow in leadership is to put yourself in situations where you have no choice but to.",
    milestone: null,
  },
];

export default function GoalsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-amber-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          Looking Ahead
        </p>
        <h1 className="text-4xl font-bold text-stone-100 mb-2">Professional Goals</h1>
        <p className="text-stone-400 text-lg">
          Areas I&apos;m actively investing in — technically, professionally, and personally.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map(({ icon: Icon, iconBg, iconText, category, title, body, milestone }) => (
          <GlassCard key={title} className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div className={`p-2.5 rounded-xl ${iconBg} ${iconText} w-fit`}>
                <Icon size={20} />
              </div>
              {milestone && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${milestone.className}`}>
                  {milestone.label}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs text-stone-500 font-mono uppercase tracking-wider mb-1">{category}</p>
              <h3 className="text-stone-100 font-semibold text-lg mb-2">{title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{body}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
