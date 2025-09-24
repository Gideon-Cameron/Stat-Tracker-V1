// src/pages/About.tsx

import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] text-[#ccd6f6] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#64ffda] mb-6 text-center">
          About Stat Tracker
        </h1>

        {/* Product Description */}
        <section className="mb-10">
          <p className="text-lg leading-relaxed mb-4">
            <strong>Stat Tracker</strong> is a fitness tracking platform that
            shows you where you truly stand on a <strong>global scale</strong>.
            Instead of just logging your workouts, Stat Tracker compares your
            performance against users worldwide and gives you a clear, visual
            breakdown of your rank across strength, endurance, speed, skill, and
            flexibility.
          </p>
          <p className="text-lg leading-relaxed">
            Our goal is simple: to give you an{" "}
            <strong>easy-to-understand visual profile</strong> of your fitness
            level, so you can see your progress, measure yourself against others,
            and stay motivated as you climb the ranks.
          </p>
        </section>

        {/* Ranking System */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#64ffda] mb-4">
            Understanding the Ranking System
          </h2>
          <p className="mb-6">
            Stat Tracker uses a <strong>comparative system</strong> rather than
            hard objective limits. Each grade shows how you stack up against
            others worldwide. Here’s what each rank means:
          </p>

          <ul className="space-y-6 text-lg leading-relaxed">
            <li>
              <strong className="text-[#64ffda]">E Rank</strong> — Top 50%.
              You’re in the global average range, which can mean anything from
              almost no exercise to average fitness levels.
            </li>
            <li>
              <strong className="text-[#64ffda]">D Rank</strong> — Top 40%.
              Above average, but not yet elevated. A solid starting point for
              those looking to climb higher.
            </li>
            <li>
              <strong className="text-[#64ffda]">C Rank</strong> — Top 30%.
              Typically represents casual gym-goers or light training. Reaching
              this rank means you’re above average and building momentum.
            </li>
            <li>
              <strong className="text-[#64ffda]">B Rank</strong> — Top 20%.
              Well above average. At this point you’re in the “in-between” —
              will you push further or settle back down?
            </li>
            <li>
              <strong className="text-[#64ffda]">A Rank</strong> — Top 10%.
              Approaching elite levels. This is where serious progress begins to
              show.
            </li>
            <li>
              <strong className="text-[#64ffda]">S Rank</strong> — Top 1%. Elite
              status. You’ve reached the level most only dream of achieving.
            </li>
            <li>
              <strong className="text-[#64ffda]">SS Rank</strong> — Top 0.1%.
              Beyond elite. This is for those unwilling to stop at the peak.
            </li>
            <li>
              <strong className="text-[#64ffda]">Mythic</strong> — Top 0.01%.
              One in ten thousand. The absolute pinnacle of global performance.
            </li>
          </ul>
        </section>

        {/* Closing */}
        <section>
          <h2 className="text-2xl font-semibold text-[#64ffda] mb-4">
            Why Stat Tracker?
          </h2>
          <p className="text-lg leading-relaxed">
            Whether you’re a casual lifter, a serious athlete, or just curious
            about your fitness, Stat Tracker gives you a{" "}
            <strong>clear, motivational way</strong> to see where you stand in
            the world. Set goals, track your growth, and push yourself toward
            the next rank — all in one place.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
