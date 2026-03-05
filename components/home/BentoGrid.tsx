import HeroTile from "./HeroTile";
import StatusTile from "./StatusTile";
import HobbiesTile from "./HobbiesTile";
import ExperienceTile from "./ExperienceTile";
import SkillsTile from "./SkillsTile";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-auto lg:auto-rows-[minmax(180px,auto)]">
      {/* Hero — 2 cols, 2 rows */}
      <div className="lg:col-span-2 lg:row-span-2">
        <HeroTile />
      </div>

      {/* Status — 1 col, 1 row */}
      <div className="lg:col-span-1">
        <StatusTile />
      </div>

      {/* Hobbies/Library gateway — 1 col, 1 row */}
      <div className="lg:col-span-1">
        <HobbiesTile />
      </div>

      {/* Experience gateway — 2 cols */}
      <div className="lg:col-span-2">
        <ExperienceTile />
      </div>

      {/* Skills — 1 col */}
      <div className="lg:col-span-1">
        <SkillsTile />
      </div>
    </div>
  );
}
