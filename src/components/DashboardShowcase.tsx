import Dash from "../assets/Dash.png";

const DashboardShowcase = () => {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span
            className="
              inline-flex
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/10
              px-4
              py-2
              text-sm
              font-semibold
              text-cyan-300
            "
          >
            Powerful Analytics
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-6xl">
            See Your Progress
            <span className="text-cyan-400"> Like Never Before</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Every assessment instantly transforms your performance into an
            interactive dashboard. Visualize your strengths, identify
            weaknesses, and track your journey toward elite performance.
          </p>

        </div>

        {/* Dashboard */}

        <div className="relative mt-20">

          {/* Glow */}

          <div className="absolute inset-0 rounded-[36px] bg-cyan-400/10 blur-3xl" />

          {/* Image */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-slate-700
              bg-[#101d36]
              shadow-[0_50px_120px_rgba(0,0,0,.45)]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-[0_60px_140px_rgba(0,0,0,.55)]
            "
          >
            <img
              src={Dash}
              alt="RankUp Dashboard"
              className="w-full"
            />
          </div>

        </div>

        {/* Features */}

        <div className="mt-20 grid gap-6 md:grid-cols-3">

          <div
            className="
              rounded-3xl
              border
              border-slate-700
              bg-slate-900/60
              p-8
              backdrop-blur
            "
          >
            <div className="mb-5 text-4xl">📊</div>

            <h3 className="text-xl font-bold text-white">
              Visual Analytics
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Beautiful radar charts and intelligent grading make your
              performance instantly understandable.
            </p>

          </div>

          <div
            className="
              rounded-3xl
              border
              border-slate-700
              bg-slate-900/60
              p-8
              backdrop-blur
            "
          >
            <div className="mb-5 text-4xl">🏆</div>

            <h3 className="text-xl font-bold text-white">
              Global Rankings
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Compare your results against athletes worldwide using consistent
              performance benchmarks.
            </p>

          </div>

          <div
            className="
              rounded-3xl
              border
              border-slate-700
              bg-slate-900/60
              p-8
              backdrop-blur
            "
          >
            <div className="mb-5 text-4xl">📈</div>

            <h3 className="text-xl font-bold text-white">
              Track Progress
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Save assessments over time and watch your improvements through
              detailed historical snapshots.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DashboardShowcase;