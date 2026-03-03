import Timeline from "@/components/journey/Timeline";

export const metadata = {
  title: "Journey — Drew Katz",
  description: "Career milestones, internships, and projects along the way.",
};

export default function JourneyPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <Timeline />
    </section>
  );
}
