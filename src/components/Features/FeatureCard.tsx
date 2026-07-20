import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { Feature } from "./types";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.12,
        duration: 0.5,
      }}
      whileHover={{
        y: -8,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-8"
    >
      {/* Glow */}

      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl"
          style={{
            background: `${feature.color}22`,
          }}
        />
      </div>

      {/* Animated Border */}

      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${feature.color}55`,
        }}
      />

      {/* Icon */}

      <motion.div
        whileHover={{
          rotate: 8,
          scale: 1.08,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
        }}
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-800/70"
      >
        <div
          className="absolute h-10 w-10 rounded-full blur-xl"
          style={{
            background: feature.color,
          }}
        />

        <Icon
          size={30}
          style={{
            color: feature.color,
          }}
          className="relative"
        />
      </motion.div>

      {/* Content */}

      <h3 className="mt-8 text-2xl font-bold text-white">
        {feature.title}
      </h3>

      <p className="mt-4 leading-8 text-slate-400">
        {feature.description}
      </p>

      {/* Learn More */}

      <motion.div
        whileHover={{
          x: 4,
        }}
        className="mt-8 flex items-center gap-2 font-semibold"
        style={{
          color: feature.color,
        }}
      >
        Learn More

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </motion.div>

      {/* Bottom Accent */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        className="absolute bottom-0 left-0 h-1 w-full origin-left"
        style={{
          background: feature.color,
        }}
      />
    </motion.article>
  );
};

export default FeatureCard;