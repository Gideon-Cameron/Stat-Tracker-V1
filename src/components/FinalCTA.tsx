import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden border-t border-cyan-400/10 bg-[#081425] py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        {/* Badge */}

        <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
          Join thousands of athletes worldwide
        </div>

        {/* Heading */}

        <h2 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl">
          Ready to
          <br />
          Find Your Rank?
        </h2>

        {/* Description */}

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Compare your performance against global standards, discover your
          strengths, and track your progress over time.
        </p>

        {/* Buttons */}

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/signup"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-[#64ffda]
              px-10
              py-5
              text-lg
              font-bold
              text-[#081425]
              shadow-[0_0_35px_rgba(100,255,218,.25)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#79ffe4]
            "
          >
            Start Free Now

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            to="/pricing"
            className="
              rounded-2xl
              border
              border-slate-700
              bg-slate-900/50
              px-10
              py-5
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:border-cyan-400/40
              hover:bg-slate-800
            "
          >
            View Premium
          </Link>

        </div>

        {/* Stats */}

        <div className="mt-20 grid gap-8 border-t border-slate-800 pt-12 sm:grid-cols-3">

          <div>
            <h3 className="text-4xl font-black text-cyan-400">
              50+
            </h3>

            <p className="mt-2 text-slate-400">
              Performance Tests
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-cyan-400">
              8
            </h3>

            <p className="mt-2 text-slate-400">
              Rank Tiers
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-cyan-400">
              ∞
            </h3>

            <p className="mt-2 text-slate-400">
              Track Your Progress
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default FinalCTA;