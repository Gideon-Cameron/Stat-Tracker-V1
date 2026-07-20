import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import RankBadge from "./RankBadge";
import { ranks } from "./rankData";

const RankingSystem = () => {
  const [selectedRank, setSelectedRank] = useState(ranks[0]);

  return (
    <section
      id="ranking"
      className="relative py-28 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-cyan-400 font-semibold tracking-[.3em] uppercase text-sm">
            Rank Up
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            THE RANK UP SYSTEM
          </h2>

          <p className="mt-5 text-slate-400 max-w-2xl mx-auto leading-7">
            Every lift contributes to your overall rank. Climb through each tier
            and discover where you stand among athletes worldwide.
          </p>
        </motion.div>

        {/* Rank Progression */}

        <div className="relative mt-20">

          {/* Beam */}

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="absolute top-8 left-0 right-0 h-[4px] origin-left rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-cyan-300
            to-cyan-400
            shadow-[0_0_25px_rgba(34,211,238,.8)]"
          />

          {/* Badges */}

          <div className="relative grid grid-cols-4 md:grid-cols-8 gap-y-12 gap-x-6">

            {ranks.map((rank, index) => (
              <RankBadge
                key={rank.rank}
                rank={rank}
                index={index}
                active={selectedRank.rank === rank.rank}
                onHover={() => setSelectedRank(rank)}
              />
            ))}

          </div>

        </div>

        {/* Info Card */}

        <div className="mt-20 flex justify-center">

          <div
            className="
            relative
            w-full
            max-w-4xl
            rounded-3xl
            border
            border-cyan-400/20
            bg-slate-900/70
            backdrop-blur-xl
            p-10
            overflow-hidden"
          >

            {/* Glow */}

            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-400/10 blur-[100px]" />

            <AnimatePresence mode="wait">

              <motion.div
                key={selectedRank.rank}
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
                  duration: .25,
                }}
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

                  {/* Left */}

                  <div>

                    <span
                      className="text-sm uppercase tracking-[.3em]"
                      style={{
                        color: selectedRank.color,
                      }}
                    >
                      {selectedRank.percentile}
                    </span>

                    <h3
                      className="mt-3 text-5xl font-black"
                      style={{
                        color: selectedRank.color,
                      }}
                    >
                      {selectedRank.rank}
                    </h3>

                    <h4 className="mt-3 text-2xl font-bold text-white">
                      {selectedRank.title}
                    </h4>

                  </div>

                  {/* Right */}

                  <div className="max-w-xl">

                    <p className="text-slate-300 leading-8 text-lg">
                      {selectedRank.description}
                    </p>

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default RankingSystem;