import RadarChart from "../components/RadarChart";
import SubRankDisplay from "../components/SubRankDisplay";

const demoRanks = {
  benchPress: "S",
  squat: "C",
  deadlift: "A",
  overheadPress: "A",
  pullUps: "B",
  pushUps: "A",
  plankHold: "S",
} as const;

const thresholds = [
  { min: 50, rank: "E" },
  { min: 60, rank: "D" },
  { min: 70, rank: "C" },
  { min: 80, rank: "B" },
  { min: 90, rank: "A" },
  { min: 99, rank: "S" },
  { min: 99.9, rank: "SS" },
  { min: 99.99, rank: "Mythic" },
] as const;

const stats = [
  {
    name: "Bench Press",
    value: 99.2,
  },
  {
    name: "Squat",
    value: 73,
  },
  {
    name: "Deadlift",
    value: 92,
  },
  {
    name: "Endurance",
    value: 87,
  },
];

export default function HeroChart() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Glow */}

      <div className="absolute h-[450px] w-[450px] rounded-full bg-[#64ffda]/10 blur-[120px]" />

      <div className="relative w-full max-w-xl rounded-2xl border border-[#233554] bg-[#112240]/90 backdrop-blur-md shadow-2xl">

        {/* Header */}

        <div className="border-b border-[#233554] px-8 py-6">

          <h2 className="text-2xl font-bold text-white">
            Strength Overview
          </h2>

          <p className="mt-1 text-slate-400">
            Example athlete profile
          </p>

        </div>

        {/* Radar */}

        <div className="px-6 pt-4">

          <RadarChart data={demoRanks} />

        </div>

        {/* Bottom */}

        <div className="grid gap-6 border-t border-[#233554] p-8 md:grid-cols-2">

          {/* Overall */}

          <div>

            <p className="text-sm uppercase tracking-widest text-slate-400">
              Overall Rank
            </p>

            <h2 className="mt-3 text-6xl font-black text-[#64ffda]">
              A+
            </h2>

            <p className="mt-4 text-slate-300">
              You're stronger than
            </p>

            <p className="text-4xl font-bold text-[#64ffda]">
              82%
            </p>

            <p className="text-slate-400">
              of lifters worldwide
            </p>

          </div>

          {/* Breakdown */}

          <div className="space-y-4">

            {stats.map((stat) => (

              <div
                key={stat.name}
                className="flex items-center justify-between rounded-lg border border-[#233554] bg-[#0A192F]/50 px-4 py-3"
              >

                <span className="text-slate-200">
                  {stat.name}
                </span>

                <SubRankDisplay
                  value={stat.value}
                  thresholds={[...thresholds]}
                />

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}