import React from "react";
import { usePaddle } from "../hooks/usePaddle";

interface PremiumButtonProps {
  firebaseUserId: string;
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

      const data = await res.json();
      console.log("📦 Netlify function response:", data);

      if (!res.ok || !data.token) {
        console.error("❌ Failed to create checkout session:", data);
        return;
      }

      // Ensure Paddle is available
      // @ts-expect-error - Paddle is global
      if (!window.Paddle) {
        console.error("❌ Paddle SDK not loaded yet.");
        return;
      }

      // Debug: log Paddle object
      // @ts-expect-error - Paddle is global
      console.log("✅ Paddle object loaded:", window.Paddle);

      // @ts-expect-error - Paddle is global
      window.Paddle.Checkout.open({
        token: data.token, // use transaction token from backend
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
