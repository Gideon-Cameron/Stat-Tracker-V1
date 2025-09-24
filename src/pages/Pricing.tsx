// src/pages/Pricing.tsx
import React, { useState } from "react";

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#ccd6f6] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#64ffda] mb-4">Pricing</h1>
        <p className="text-lg text-[#8892b0]">
          Choose the plan that’s right for you. Start free, or unlock powerful{" "}
          <strong>premium features</strong> with a simple upgrade.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-lg transition ${
              billingCycle === "monthly"
                ? "bg-[#64ffda] text-[#0a192f] font-semibold"
                : "bg-[#112240] text-[#ccd6f6] hover:bg-[#1a2d4a]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-lg transition ${
              billingCycle === "yearly"
                ? "bg-[#64ffda] text-[#0a192f] font-semibold"
                : "bg-[#112240] text-[#ccd6f6] hover:bg-[#1a2d4a]"
            }`}
          >
            Yearly (Save 2 months)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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

        {/* Premium Plan */}
        <div className="bg-[#112240] border-2 border-[#64ffda] rounded-xl p-8 shadow-xl flex flex-col relative">
          <div className="absolute top-0 right-0 bg-[#64ffda] text-[#0a192f] text-xs font-bold px-3 py-1 rounded-bl-lg">
            Popular
          </div>
          <h2 className="text-2xl font-bold mb-2">Premium</h2>
          <p className="text-sm text-[#8892b0] mb-6">
            Unlock advanced tracking and tools to push further.
          </p>
          <p className="text-4xl font-extrabold mb-2">
            {billingCycle === "monthly" ? "$5" : "$50"}
          </p>
          <p className="text-sm text-[#8892b0] mb-6">
            {billingCycle === "monthly"
              ? "per month"
              : "per year (2 months free)"}
          </p>

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
