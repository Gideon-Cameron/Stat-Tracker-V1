import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-3xl mx-auto text-[#ccd6f6]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#64ffda]">
        Terms of Service
      </h1>

      <p className="mb-4 text-sm text-gray-400">Last updated: September 18, 2025</p>

      <section className="space-y-6">
        <p>
          Welcome to Stat Tracker (“we,” “our,” or “us”). These Terms of Service
          (“Terms”) govern your access to and use of Stat Tracker (the
          “Service”). By creating an account or using the Service, you agree to
          be bound by these Terms. If you do not agree, please do not use Stat
          Tracker.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">1. Who We Are</h2>
        <p>
          The Service is provided by <strong>Gideon Cameron Germond</strong>,
          operating as Stat Tracker. For support or questions, contact us at{" "}
          <a
            href="mailto:stat.trackersuppo@gmail.com"
            className="text-[#64ffda] hover:underline"
          >
            stat.trackersuppo@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">2. Eligibility</h2>
        <p>
          You must be at least 13 years old to use Stat Tracker. If you are
          under 18, you must have the consent of a parent or guardian.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">3. Description of the Service</h2>
        <p>
          Stat Tracker allows users to enter physical performance data (such as
          strength, endurance, speed, skill, and flexibility exercises) to
          receive rankings compared to global averages. Rankings range from{" "}
          <em>E rank (beginner)</em> to <em>Mythic rank (top 0.01%)</em>.
        </p>
        <p>Premium features include, but are not limited to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sub-rank insights with visual progress indicators</li>
          <li>Automatic weekly snapshots of performance progress</li>
          <li>Additional features that may be added in the future</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#64ffda]">4. Accounts</h2>
        <p>
          You are responsible for maintaining the security of your account,
          including your email and password. We are not responsible for any loss
          resulting from unauthorized access to your account.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">5. Subscriptions & Payments</h2>
        <p>
          Stat Tracker offers both <strong>monthly ($5)</strong> and{" "}
          <strong>yearly ($50)</strong> subscriptions. A{" "}
          <strong>7-day free trial</strong> is available for monthly plans.
          Payments are processed securely through Paddle, our payment provider.
          By subscribing, you also agree to Paddle’s billing terms.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">6. Refunds</h2>
        <p>
          Refund requests are handled according to our{" "}
          <a href="/refunds" className="text-[#64ffda] hover:underline">
            Refund Policy
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">7. Restrictions</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Copy, modify, or distribute our code, features, or content without permission</li>
          <li>Use the Service for unlawful, fraudulent, or harmful activities</li>
          <li>
            Resell, sublicense, or exploit Stat Tracker for commercial purposes
            without consent
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#64ffda]">8. Intellectual Property</h2>
        <p>
          All content, branding, features, and code within Stat Tracker are the
          intellectual property of Gideon Cameron Germond. You may not reproduce
          or use them without prior written consent.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">9. Termination</h2>
        <p>
          We may suspend or terminate your account if you violate these Terms or
          misuse the Service.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">10. Disclaimer of Warranties</h2>
        <p>
          Stat Tracker is provided “as is” and “as available,” without
          warranties of any kind. We make no guarantees regarding accuracy,
          reliability, or availability.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">11. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, we are not liable for any
          damages, losses, or claims resulting from your use of Stat Tracker.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the country in which you
          reside, unless otherwise required by law.
        </p>
      </section>

      <div className="mt-10 text-center text-sm text-gray-400">
        For questions about these Terms, please email:{" "}
        <a
          href="mailto:stat.trackersuppo@gmail.com"
          className="text-[#64ffda] hover:underline"
        >
          stat.trackersuppo@gmail.com
        </a>
      </div>
    </div>
  );
};

export default TermsPage;
