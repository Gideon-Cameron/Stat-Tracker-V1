import { useEffect } from "react";

export const usePaddle = () => {
  const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string;
  const env = import.meta.env.VITE_PADDLE_ENV || "sandbox";

  useEffect(() => {
    // Only load once
    if (!document.getElementById("paddle-js")) {
      const script = document.createElement("script");
      script.id = "paddle-js";
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js"; // v2 SDK
      script.async = true;
      script.onload = () => {
        // @ts-expect-error - Paddle is attached to window
        window.Paddle.Setup({
          token: clientToken,
          environment: env, // "sandbox" or "production"
        });
      };
      document.body.appendChild(script);
    }
  }, [clientToken, env]);
};
