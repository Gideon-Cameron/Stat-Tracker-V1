import React from "react";
import { usePaddle } from "../hooks/usePaddle";

interface PremiumButtonProps {
  firebaseUserId: string;
}

// Define what we expect from our Netlify function
interface CheckoutResponse {
  token?: string; // transaction ID returned from Paddle
  raw?: unknown;  // raw Paddle API response (can be anything, so `unknown` is safer than `any`)
  error?: unknown;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ firebaseUserId }) => {
  usePaddle();

  const handleCheckout = async () => {
    const monthlyId = import.meta.env.VITE_PADDLE_PRICE_MONTHLY as string;
    // const yearlyId = import.meta.env.VITE_PADDLE_PRICE_YEARLY as string;

    try {
      console.log("📡 Calling Netlify function to create checkout...");

      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: monthlyId, // start with monthly plan
          firebaseUserId,
        }),
      });

      console.log("📊 Netlify response status:", res.status, res.statusText);

      let data: CheckoutResponse;
      try {
        data = (await res.json()) as CheckoutResponse;
      } catch (jsonErr) {
        console.error("❌ Failed to parse JSON from Netlify response", jsonErr);
        return;
      }

      console.log("📦 Netlify function response:", data);

      if (!res.ok || !data.token) {
        console.error("❌ Failed to create checkout session:", data);
        return;
      }

      // Ensure Paddle SDK is loaded
      if (!window.Paddle) {
        console.error("❌ Paddle SDK not loaded yet.");
        return;
      }

      console.log("✅ Paddle object loaded:", window.Paddle);

      // Use the transaction ID returned by Paddle
      console.log("➡️ Opening Paddle checkout with transactionId:", data.token);

      window.Paddle.Checkout.open({
        transactionId: data.token, // 👈 now matches what we return from create-checkout
        settings: { displayMode: "overlay" },
      });
    } catch (err) {
      console.error("🔥 Error creating checkout:", err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Go Premium
    </button>
  );
};

export default PremiumButton;
