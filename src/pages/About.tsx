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
  <strong>Stat Tracker</strong> isn’t just another workout logger — it’s your
  window into how you measure up against the world. Every rep, run, or stretch
  is transformed into a <strong>global ranking</strong>, so you can see exactly
  where you stand and how far you’ve come.
</p>
<p className="text-lg leading-relaxed mb-4">
  I built this platform because I wanted more than just numbers in a notebook. 
  I wanted a way to <strong>stay motivated</strong>, to push forward, and to 
  actually see my progress in a way that’s clear and inspiring. That’s why
  Stat Tracker gives you a <strong>visual profile</strong> of your fitness —
  showing your strengths, your weaknesses, and how you stack up worldwide.
</p>
<p className="text-lg leading-relaxed">
  Whether you’re just starting out or chasing the top, Stat Tracker makes
  your journey <strong>easy to track, fun to follow, and impossible to ignore</strong>.
  Every small improvement moves you up the ranks, and every rank earned is proof
  that you’re stronger than yesterday.
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
    You’re standing with the global average. This range spans from little-to-no
    training up to everyday fitness levels. Everyone starts here — it’s your
    first step into the journey.
  </li>
  <li>
    <strong className="text-[#64ffda]">D Rank</strong> — Top 40%.  
    You’ve already pulled ahead of the crowd. Above average, but still room to
    grow. This is the foundation for anyone serious about climbing higher.
  </li>
  <li>
    <strong className="text-[#64ffda]">C Rank</strong> — Top 30%.  
    The mark of the casual gym-goer. Reaching C means you’re no longer just
    average — you’re building momentum and standing out from the pack.
  </li>
  <li>
    <strong className="text-[#64ffda]">B Rank</strong> — Top 20%.  
    Now it’s getting exciting. You’re well above average, in the zone where
    progress starts to demand consistency. At this point, you’re in the
    “in-between” — push forward, and greatness awaits.
  </li>
  <li>
    <strong className="text-[#64ffda]">A Rank</strong> — Top 10%.  
    Welcome to the edge of elite. You’ve broken into the upper tier, and your
    dedication is showing. From here, the climb gets harder — and far more
    rewarding.
  </li>
  <li>
    <strong className="text-[#64ffda]">S Rank</strong> — Top 1%.  
    You’ve joined the elite. This is the level most only dream about — proof
    that your discipline, training, and drive have carried you far beyond the
    ordinary.
  </li>
  <li>
    <strong className="text-[#64ffda]">SS Rank</strong> — Top 0.1%.  
    Almost untouchable. This rank is for the relentless — those who refuse to
    stop at the summit and instead carve a new peak above it.
  </li>
  <li>
    <strong className="text-[#64ffda]">Mythic</strong> — Top 0.01%.  
    One in ten thousand. A living legend. If you’ve reached this rank, you’re
    not just fit — you’re a rarity, standing at the absolute pinnacle of global
    performance.
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
