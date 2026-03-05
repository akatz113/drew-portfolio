import { Mountain } from "lucide-react";

export const metadata = {
  title: "Rock Climbing & Backpacking — Drew Katz",
  description: "Routes climbed, trails hiked, and the outdoors that recharge me.",
};

export default function ClimbingPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-orange-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          <Mountain size={12} />
          Personal Interests
        </div>
        <h1 className="text-4xl font-bold text-stone-100 mb-2">Rock Climbing & Backpacking</h1>
        <p className="text-stone-400 text-lg">
          Routes climbed, trails hiked, and the outdoors that recharge me.
        </p>
      </div>

      <div className="glass rounded-2xl px-8 py-12 text-center border border-dashed border-stone-700/60">
        <Mountain size={32} className="text-orange-400/40 mx-auto mb-4" />
        <p className="text-stone-500 text-sm">Content coming soon.</p>
      </div>
    </section>
  );
}
