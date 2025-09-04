import React from "react";
import { usePaddle } from "../hooks/usePaddle";

interface PremiumButtonProps {
  firebaseUserId: string;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ firebaseUserId }) => {
  usePaddle();

  const handleCheckout = () => {
    const monthlyId = import.meta.env.VITE_PADDLE_PRICE_MONTHLY as string;
    const yearlyId = import.meta.env.VITE_PADDLE_PRICE_YEARLY as string;

    // @ts-expect-error - Paddle is global
    window.Paddle.Checkout.open({
      items: [
        {
          priceId: monthlyId, // default monthly
          quantity: 1,
        },
      ],
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
