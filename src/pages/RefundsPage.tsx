import React from "react";

const RefundsPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-3xl mx-auto text-[#ccd6f6]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#64ffda]">
        Refund and Cancellation Policy
      </h1>

      <p className="mb-4 text-sm text-gray-400">Last updated: September 18, 2025</p>

      <section className="space-y-6">
        <p>
          At Stat Tracker, we aim to provide a fair and transparent subscription
          experience. This Refund and Cancellation Policy explains how
          cancellations and refunds are handled for premium subscriptions.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">
          1. Subscription Renewals
        </h2>
        <p>
          Subscriptions are billed automatically on a recurring basis (monthly or
          yearly) through our payment provider, Paddle, until cancelled by the
          user.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">
          2. Cancellations
        </h2>
        <p>
          You may cancel your subscription at any time through your account
          settings. After cancellation, your premium access will remain active
          until the end of the current billing cycle. No partial refunds will be
          issued for unused time.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">
          3. Refunds
        </h2>
        <p>
          Refunds are only provided in special cases, such as billing errors or
          technical issues that prevent you from using the service. Renewal
          payments are <strong>non-refundable</strong> once processed.
        </p>

        <h2 className="text-xl font-semibold text-[#64ffda]">
          4. How to Request a Refund
        </h2>
        <p>
          If you believe you are eligible for a refund, please contact us at{" "}
          <a
            href="mailto:stat.trackersuppo@gmail.com"
            className="text-[#64ffda] hover:underline"
          >
            stat.trackersuppo@gmail.com
          </a>{" "}
          or reach out to{" "}
          <a
            href="https://paddle.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64ffda] hover:underline"
          >
            Paddle Support
          </a>
          . Please include your account email and payment details when making a
          request.
        </p>
      </section>

      <div className="mt-10 text-center text-sm text-gray-400">
        For questions about this policy, please email:{" "}
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

export default RefundsPage;
