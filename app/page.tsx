import BentoGrid from "@/components/home/BentoGrid";
import Timeline from "@/components/journey/Timeline";

export default function HomePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10 space-y-20">
      <BentoGrid />
      <Timeline />
    </section>
  );
}
