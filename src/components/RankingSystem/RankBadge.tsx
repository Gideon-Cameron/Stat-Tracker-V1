import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Rank } from "./types";

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
  const isMythic = rank.rank === "MYTHIC";

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
      tabIndex={0}
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
          duration: 0.25,
        }}
        className={`absolute rounded-full blur-3xl ${
          isMythic ? "h-28 w-36" : "h-24 w-24"
        }`}
        style={{
          background: rank.color,
        }}
      />

      {/* Badge */}

      <motion.div
        animate={{
          scale: active ? 1.08 : 1,
          rotate: active ? 2 : 0,
          borderColor: active
            ? rank.color
            : "rgba(255,255,255,.08)",
          boxShadow: active
            ? `0 0 35px ${rank.color}55`
            : "0 12px 30px rgba(0,0,0,.25)",
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 16,
        }}
        className={`
          relative
          flex
          items-center
          justify-center
          border
          backdrop-blur-xl
          bg-slate-900/80
          transition-all
          duration-300

          ${isMythic ? "h-20 w-32" : "h-20 w-20"}
        `}
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

        {/* Rank */}

        <motion.span
          animate={{
            color: active ? rank.color : "#ffffff",
          }}
          className={`relative font-black ${
            isMythic
              ? "text-lg tracking-[0.18em]"
              : "text-3xl"
          }`}
        >
          {rank.rank}
        </motion.span>
      </motion.div>

      {/* Title */}

      <motion.h4
        animate={{
          color: active ? "#ffffff" : "#CBD5E1",
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