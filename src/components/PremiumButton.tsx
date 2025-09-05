import React from "react";
import { usePaddle } from "../hooks/usePaddle";

interface PremiumButtonProps {
  firebaseUserId: string;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ firebaseUserId }) => {
  usePaddle();

  const handleCheckout = () => {
    const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string;
    const env = import.meta.env.VITE_PADDLE_ENV as string;
    const monthlyId = import.meta.env.VITE_PADDLE_PRICE_MONTHLY as string;
    const yearlyId = import.meta.env.VITE_PADDLE_PRICE_YEARLY as string;

    // Debug logs
    console.log("🔑 Paddle client token:", clientToken);
    console.log("🌍 Paddle environment:", env);
    console.log("💵 Monthly Price ID:", monthlyId);
    console.log("💵 Yearly Price ID:", yearlyId);

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
      items: [{ priceId: monthlyId, quantity: 1 }],
      upsell: [
        {
          items: [{ priceId: yearlyId, quantity: 1 }],
          title: "Go Yearly and Save!",
          message: "Get 2 months free with the annual plan.",
        },
      ],
      passthrough: JSON.stringify({ firebaseUserId }),
    });
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
