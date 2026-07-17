import RadarChart from "../components/RadarChart";
import favicon from "../assets/favicon.png";

const demoRanks = {
  benchPress: "S",
  squat: "S",
  deadlift: "S",
  overheadPress: "S",
  pullUps: "S",
  pushUps: "S",
  plankHold: "S",
} as const;

export default function HeroChart() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Ambient Glow */}
      <div className="absolute h-[400px] w-[400px] rounded-full bg-[#2CEAC8]/10 blur-[130px]" />

      <div
        className="
          relative
          w-full
          max-w-lg
          overflow-hidden
          rounded-3xl
          border
          border-[#213a57]
          bg-gradient-to-b
          from-[#122340]
          via-[#10213B]
          to-[#0D1B33]
          shadow-[0_30px_80px_rgba(0,0,0,.55)]
          backdrop-blur-xl
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#213a57] px-6 py-5">

          <h2 className="text-xl font-bold text-white">
            Strength Overview
          </h2>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-[#2CEAC8]/30
              bg-[#132544]
              shadow-[0_0_18px_rgba(44,234,200,.18)]
            "
          >
            <img
              src={favicon}
              alt="Rank Up Logo"
              className="h-6 w-6 object-contain"
            />
          </div>

        </div>

        {/* Radar */}

        <div className="relative px-5 py-2">

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-64
              w-64
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#2CEAC8]/10
              blur-3xl
            "
          />

          <div className="relative">
            <RadarChart data={demoRanks} />
          </div>

        </div>

        {/* Bottom */}

        <div
          className="
            grid
            grid-cols-2
            border-t
            border-[#213a57]
            bg-[#0B182C]
          "
        >

          {/* Overall */}

          <div className="px-5 py-3">

            <p className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
              Overall Rank
            </p>

            <h2 className="mt-1 text-3xl font-black leading-none text-[#5EF5DA]">
              A
            </h2>

          </div>

          {/* Percentile */}

          <div className="border-l border-[#213a57] px-5 py-3">

            <p className="text-xs leading-tight text-slate-300">
              You're stronger than
            </p>

            <p className="mt-0.5 text-3xl font-black leading-none text-[#5EF5DA]">
              92%
            </p>

            <p className="mt-0.5 text-[11px] leading-tight text-slate-400">
              of lifters worldwide
            </p>

          </div>

        </div>

        {/* Subtle inner border */}

        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />

      </div>

    </div>
  );
}