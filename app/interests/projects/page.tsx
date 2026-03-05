import { Wrench } from "lucide-react";

export const metadata = {
  title: "Personal Projects — Drew Katz",
  description: "Things I've built for fun — software, hardware, and everything in between.",
};

export default function ProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-violet-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          <Wrench size={12} />
          Personal Interests
        </div>
        <h1 className="text-4xl font-bold text-stone-100 mb-2">Personal Projects</h1>
        <p className="text-stone-400 text-lg">
          Things I&apos;ve built for fun — software, hardware, and everything in between.
        </p>
      </div>

      <div className="glass rounded-2xl px-8 py-12 text-center border border-dashed border-stone-700/60">
        <Wrench size={32} className="text-violet-400/40 mx-auto mb-4" />
        <p className="text-stone-500 text-sm">Projects coming soon.</p>
      </div>
    </section>
  );
}
