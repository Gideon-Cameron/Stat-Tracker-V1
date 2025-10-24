import React from "react";
import { usePaddle } from "../hooks/usePaddle";

interface PremiumButtonProps {
  firebaseUserId: string;
  email: string; // 👈 new prop, required to send to backend
}

// Define what we expect from our Netlify function
interface CheckoutResponse {
  token?: string; // transaction ID returned from Paddle
  raw?: unknown;  // raw Paddle API response (can be anything, so `unknown` is safer than `any`)
  error?: unknown;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ firebaseUserId, email }) => {
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
          email, // 👈 send logged-in user's email to backend
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

      console.log("📦 Netlify function response (full):", data);

      if (data.error) {
        console.error("🚨 Paddle API returned an error:", data.error);
      }

      if (!res.ok || !data.token) {
        console.error("❌ Failed to create checkout session. Response was:", data);
        return;
      }

      if (!window.Paddle) {
        console.error("❌ Paddle SDK not loaded yet.");
        return;
      }

      console.log("✅ Paddle object loaded. Available methods:", Object.keys(window.Paddle));

      console.log("➡️ About to open Paddle checkout with transactionId:", data.token);

      try {
        window.Paddle.Checkout.open({
          transactionId: data.token, // 👈 from Netlify function
          settings: { displayMode: "overlay" },
        });
        console.log("🎉 Paddle.Checkout.open() was called successfully.");
      } catch (checkoutErr) {
        console.error("🔥 Error calling Paddle.Checkout.open:", checkoutErr);
      }
    } catch (err) {
      console.error("🔥 Unexpected error creating checkout:", err);
    }
  };

  return (
    <button
  onClick={handleCheckout}
  className="px-4 py-2 rounded font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg"
>
  Go Premium
</button>
  );
};

export default PremiumButton;
