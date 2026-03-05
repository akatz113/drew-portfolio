import { Plane } from "lucide-react";

export const metadata = {
  title: "Travel & Trips — Drew Katz",
  description: "Photo albums and memories from adventures around the world.",
};

export default function TravelPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sky-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          <Plane size={12} />
          Personal Interests
        </div>
        <h1 className="text-4xl font-bold text-stone-100 mb-2">Travel & Trips</h1>
        <p className="text-stone-400 text-lg">
          Photo albums and memories from adventures around the world.
        </p>
      </div>

      <div className="glass rounded-2xl px-8 py-12 text-center border border-dashed border-stone-700/60">
        <Plane size={32} className="text-sky-400/40 mx-auto mb-4" />
        <p className="text-stone-500 text-sm">Albums coming soon.</p>
      </div>
    </section>
  );
}
