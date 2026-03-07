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
    body: "Pursuing GDT-PT certification to formalize tolerancing expertise and communicate design intent more precisely across engineering and manufacturing teams. Currently applying GD&T and DFM principles in component redesigns and 3D scanning validation workflows at GE Appliances.",
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
    body: "Actively building and deploying AI solutions — from the company's first autonomous quality trend-detection system to tools that automate unstructured data processing across engineering teams. Committed to identifying high-impact applications of AI that eliminate manual workflows and enable data-driven decision-making at scale.",
    milestone: null,
  },
  {
    icon: Users,
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    category: "Career Development",
    title: "Leadership",
    body: "I believe the best way to grow as a leader is to seek out challenging roles that force you to learn, alongside people who push you to be better. I plan to keep pursuing complex, high-stakes problems where strong leadership and teamwork make the difference.",
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
