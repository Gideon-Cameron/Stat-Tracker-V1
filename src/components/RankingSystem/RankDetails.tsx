import { AnimatePresence, motion } from "framer-motion";

interface Rank {
  rank: string;
  title: string;
  percentile: string;
  color: string;
  description: string;
}

interface RankDetailsProps {
  rank: Rank;
}

const RankDetails = ({ rank }: RankDetailsProps) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-slate-900/70 backdrop-blur-xl">

        {/* Background Glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/5 blur-[120px]" />

        {/* Top Accent */}
        <motion.div
          key={rank.rank + "-line"}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45 }}
          className="absolute top-0 left-0 h-1 w-full origin-left"
          style={{
            background: `linear-gradient(to right, ${rank.color}, transparent)`,
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={rank.rank}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="relative p-10 md:p-14"
          >
            <div className="grid gap-12 md:grid-cols-[260px_1fr] items-center">

              {/* Left Side */}
              <div className="flex flex-col items-center md:items-start">

                <span
                  className="uppercase tracking-[0.35em] text-sm font-semibold"
                  style={{ color: rank.color }}
                >
                  {rank.percentile}
                </span>

                <motion.h2
                  key={rank.rank}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  className="mt-5 text-7xl font-black leading-none"
                  style={{ color: rank.color }}
                >
                  {rank.rank}
                </motion.h2>

                <h3 className="mt-4 text-3xl font-bold text-white">
                  {rank.title}
                </h3>
              </div>

              {/* Right Side */}
              <div>

                <h4 className="text-xl md:text-2xl font-semibold text-white">
                  What this rank means
                </h4>

                <p className="mt-6 text-lg leading-9 text-slate-300">
                  {rank.description}
                </p>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RankDetails;