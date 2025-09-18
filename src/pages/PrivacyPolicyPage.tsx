import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-3xl mx-auto text-[#ccd6f6]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#64ffda]">
        Privacy Policy
      </h1>

      <p className="mb-4 text-sm text-gray-400">Last updated: September 18, 2025</p>

      <section className="space-y-6">
        <p>
          Stat Tracker (“we,” “our,” or “us”) respects your privacy. This
          Privacy Policy explains how we collect, use, and protect your
          information when you use our website and services (“Service”).
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">1. Information We Collect</h2>
        <p>We collect the following information from users:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Account Information:</strong> Email address and password (for
            authentication and account access).
          </li>
          <li>
            <strong>Fitness Data:</strong> Information you choose to provide in
            input forms (e.g., performance stats like strength, endurance,
            flexibility, etc.) in order to calculate and display rankings.
          </li>
          <li>
            <strong>Future Optional Data:</strong> Username and profile picture
            (if you choose to add these when features are made available).
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#64ffda]">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and maintain the Service</li>
          <li>Store and display your performance rankings</li>
          <li>Authenticate your account and keep it secure</li>
          <li>Process subscription payments via Paddle</li>
          <li>Respond to support requests and communicate important updates</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#64ffda]">3. How Your Data Is Stored</h2>
        <p>
          We use <strong>Google Firebase / Firestore</strong> to store both your
          account information and fitness data. Firebase Authentication is used
          to manage login securely.
        </p>
        <p>
          Payment information (such as credit card details) is handled directly
          by <strong>Paddle</strong>. We do not store or have access to your
          payment card information.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">4. Sharing of Information</h2>
        <p>
          We do not sell or rent your personal data. We may share limited data
          only with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Paddle</strong> – for payment processing and subscription
            management
          </li>
          <li>
            <strong>Firebase</strong> – for authentication and data storage
          </li>
          <li>
            Legal authorities – if required by law or to comply with legal
            processes
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#64ffda]">5. Data Retention and Deletion</h2>
        <p>
          We retain your data while your account is active. If you delete your
          account, all associated fitness data and account information will be
          deleted. You may also request data deletion at any time in accordance
          with GDPR and CCPA rights.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">6. Your Rights</h2>
        <p>
          Depending on your location, you may have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Request deletion of your data</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a
            href="mailto:stat.trackersuppo@gmail.com"
            className="text-[#64ffda] hover:underline"
          >
            stat.trackersuppo@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">7. Security</h2>
        <p>
          We take reasonable measures to protect your data, including secure
          authentication and encrypted storage through Firebase. However, no
          method of transmission or storage is 100% secure, and we cannot
          guarantee absolute protection.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page with a revised “Last updated” date.
        </p>
      </section>

      <div className="mt-10 text-center text-sm text-gray-400">
        For questions about this Privacy Policy, please email:{" "}
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

export default PrivacyPolicyPage;
