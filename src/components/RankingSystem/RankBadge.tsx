import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Rank {
  rank: string;
  title: string;
  percentile: string;
  color: string;
  description: string;
}

interface RankBadgeProps {
  rank: Rank;
  index: number;
  active: boolean;
  onHover: () => void;
}

const RankBadge = ({
  rank,
  index,
  active,
  onHover,
}: RankBadgeProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
      }}
      whileHover={{
        y: -8,
        scale: 1.08,
      }}
      onMouseEnter={onHover}
      onFocus={onHover}
      className="relative flex flex-col items-center cursor-pointer select-none"
    >
      {/* Connection Arrow */}

      {index !== 7 && (
        <div className="absolute top-9 left-[78%] hidden md:flex items-center">
          <ChevronRight
            size={20}
            className="text-slate-500"
          />
        </div>
      )}

      {/* Glow */}

      <motion.div
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.7,
        }}
        transition={{
          duration: .25,
        }}
        className="absolute h-24 w-24 rounded-full blur-3xl"
        style={{
          background: rank.color,
        }}
      />

      {/* Hexagon */}

      <motion.div
        animate={{
          scale: active ? 1.08 : 1,
          rotate: active ? 2 : 0,
          borderColor: active
            ? rank.color
            : "rgba(255,255,255,.08)",
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 16,
        }}
        className="
          relative
          h-20
          w-20
          flex
          items-center
          justify-center

          backdrop-blur-xl

          border

          shadow-xl

          bg-slate-900/80

          transition-all
          duration-300
        "
        style={{
          clipPath:
            "polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0% 50%)",
        }}
      >
        {/* Inner Glow */}

        <div
          className="absolute inset-[2px] opacity-20"
          style={{
            background: `radial-gradient(circle at top, ${rank.color}, transparent 70%)`,
            clipPath:
              "polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0% 50%)",
          }}
        />

        {/* Rank Letter */}

        <motion.span
          animate={{
            color: active ? rank.color : "#ffffff",
          }}
          className="relative text-3xl font-black"
        >
          {rank.rank}
        </motion.span>
      </motion.div>

      {/* Title */}

      <motion.h4
        animate={{
          color: active ? "#fff" : "#CBD5E1",
        }}
        className="mt-5 text-sm font-semibold text-center"
      >
        {rank.title}
      </motion.h4>

      {/* Percentage */}

      <motion.span
        animate={{
          color: active ? rank.color : "#64748B",
        }}
        className="mt-1 text-xs tracking-wide"
      >
        {rank.percentile}
      </motion.span>
    </motion.div>
  );
};

export default RankBadge;