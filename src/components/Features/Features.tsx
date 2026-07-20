import { motion } from "framer-motion";

import FeatureCard from "./FeatureCard";
import { features } from "./featureData";

const Features = () => {
  return (
    <section className="relative py-28 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[140px]" />
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
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.35em]">
            Features
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            EVERYTHING YOU NEED TO
            <br />
            RANK UP
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-slate-400 leading-8">
            Track your performance, compare yourself with athletes worldwide,
            and watch your progress climb through every rank.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => (

            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />

          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;