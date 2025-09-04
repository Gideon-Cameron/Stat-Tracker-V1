import { useEffect } from "react";

export const usePaddle = () => {
  const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string;
  const env = import.meta.env.VITE_PADDLE_ENV || "sandbox";

  useEffect(() => {
    if (!document.getElementById("paddle-js")) {
      const script = document.createElement("script");
      script.id = "paddle-js";
      // Use sandbox vs production
      script.src =
        env === "sandbox"
          ? "https://sandbox-cdn.paddle.com/paddle/v2/paddle.js"
          : "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async = true;
      script.onload = () => {
        // @ts-expect-error - Paddle is attached globally
        window.Paddle.Setup({ token: clientToken });
      };
      document.body.appendChild(script);
    }
  }, [clientToken, env]);
};
