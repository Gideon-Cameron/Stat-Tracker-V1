// src/pages/Pricing.tsx
import React from "react";

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] text-[#ccd6f6] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#64ffda] mb-4">Pricing</h1>
        <p className="text-lg text-[#8892b0]">
          Start free, or upgrade to <strong>Premium</strong> for advanced
          tracking, progress tools, and an ad-free experience.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="bg-[#112240] border border-[#233554] rounded-xl p-8 shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Free</h2>
          <p className="text-sm text-[#8892b0] mb-6">
            Explore the basics and see how you stack up globally.
          </p>
          <p className="text-4xl font-extrabold mb-2">$0</p>
          <p className="text-sm text-[#8892b0] mb-6">per month</p>

          <ul className="space-y-3 text-left flex-grow">
            <li>✔ Global comparison & ranking system (E → Mythic)</li>
            <li>✔ Radar graph of your stats</li>
            <li>✔ Access to all stat categories</li>
            <li>✔ Fitness dashboard with current stats</li>
          </ul>

          <button
            disabled
            className="mt-8 w-full py-3 rounded-lg bg-[#233554] text-[#8892b0] cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>

        {/* Premium Monthly Plan */}
        <div className="bg-[#112240] border-2 border-[#64ffda] rounded-xl p-8 shadow-xl flex flex-col relative">
          <div className="absolute top-0 right-0 bg-[#64ffda] text-[#0a192f] text-xs font-bold px-3 py-1 rounded-bl-lg">
            Popular
          </div>
          <h2 className="text-2xl font-bold mb-2">Premium Monthly</h2>
          <p className="text-sm text-[#8892b0] mb-6">
            Unlock advanced tracking and stay motivated month to month.
          </p>
          <p className="text-4xl font-extrabold mb-2">$5</p>
          <p className="text-sm text-[#8892b0] mb-6">per month</p>

          <ul className="space-y-3 text-left flex-grow">
            <li>✔ Everything in Free</li>
            <li>✔ Sub ranks with progress circles</li>
            <li>✔ Weekly snapshots of your stats</li>
            <li>✔ Goal tracking (coming soon)</li>
            <li>✔ Ad-free experience (future update)</li>
          </ul>

          <button className="mt-8 w-full py-3 rounded-lg bg-[#64ffda] text-[#0a192f] font-semibold hover:bg-[#52e0c4] transition">
            Get Premium
          </button>

          <p className="text-xs text-[#8892b0] text-center mt-4">
            Includes a free 7-day trial
          </p>
        </div>

        {/* Premium Yearly Plan */}
        <div className="bg-[#112240] border border-[#233554] rounded-xl p-8 shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Premium Yearly</h2>
          <p className="text-sm text-[#8892b0] mb-6">
            Commit for a year and save money while unlocking every feature.
          </p>
          <p className="text-4xl font-extrabold mb-2">$50</p>
          <p className="text-sm text-[#8892b0] mb-6">per year (2 months free)</p>

          <ul className="space-y-3 text-left flex-grow">
            <li>✔ Everything in Free</li>
            <li>✔ Sub ranks with progress circles</li>
            <li>✔ Weekly snapshots of your stats</li>
            <li>✔ Goal tracking (coming soon)</li>
            <li>✔ Ad-free experience (future update)</li>
          </ul>

          <button className="mt-8 w-full py-3 rounded-lg bg-[#64ffda] text-[#0a192f] font-semibold hover:bg-[#52e0c4] transition">
            Get Premium
          </button>

          <p className="text-xs text-[#8892b0] text-center mt-4">
            Includes a free 7-day trial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
