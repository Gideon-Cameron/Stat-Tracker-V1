import { Link } from "react-router-dom";
import HeroChart from "./HeroChart";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#071321]">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-20 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#64ffda]/8 blur-[120px]" />

      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-[#64ffda]/40" />
        <div className="absolute left-[28%] top-[42%] h-1 w-1 rounded-full bg-[#64ffda]/25" />
        <div className="absolute left-[75%] top-[24%] h-1 w-1 rounded-full bg-[#64ffda]/35" />
        <div className="absolute left-[83%] top-[60%] h-1 w-1 rounded-full bg-[#64ffda]/20" />
      </div>

      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-6 lg:px-8">

        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Left */}
          <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#64ffda]">
              Fitness Meets RPG Progression
            </p>

            <h1 className="font-black leading-[0.92] text-white text-5xl lg:text-6xl">
              See Where
              <br />
              You
              <br />
              <span className="text-[#64ffda]">
                Rank Worldwide
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
              Compare your strength, endurance, speed, skill and flexibility
              against global averages. Earn ranks from
              <span className="font-semibold text-[#64ffda]"> E </span>
              to
              <span className="font-semibold text-[#64ffda]"> Mythic</span>,
              while tracking your progress every step of the way.
            </p>

            {/* Buttons */}

            <div className="mt-6 flex flex-wrap gap-3">

              <Link
                to="/login"
                className="rounded-xl bg-[#64ffda] px-8 py-3 font-bold text-[#071321] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(100,255,218,.35)]"
              >
                Get My Rank
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-[#64ffda] px-8 py-3 font-semibold text-white transition hover:bg-[#64ffda]/10"
              >
                Learn More
              </Link>

            </div>

            {/* Features */}

            <div className="mt-7 flex flex-wrap gap-6">

              <Feature
                title="Global Rankings"
                subtitle="Worldwide comparisons"
              />

              <Feature
                title="Track Progress"
                subtitle="Every improvement"
              />

              <Feature
                title="5 Categories"
                subtitle="Complete fitness"
              />

            </div>

          </div>

          {/* Right */}

          <HeroChart />

        </div>

      </div>
    </section>
  );
}

function Feature({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="h-8 w-px bg-[#233554]" />

      <div>

        <h3 className="text-sm font-semibold text-[#64ffda]">
          {title}
        </h3>

        <p className="text-xs text-slate-400">
          {subtitle}
        </p>

      </div>

    </div>
  );
}