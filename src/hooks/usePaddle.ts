import { useEffect } from "react";

declare global {
  interface Window {
    Paddle?: {
      Setup: (options: { token: string }) => void;
      Checkout: {
        open: (options: Record<string, unknown>) => void;
      };
    };
  }
}

export const usePaddle = () => {
  const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string;
  const env = import.meta.env.VITE_PADDLE_ENV || "sandbox";

  useEffect(() => {
    if (document.getElementById("paddle-js")) {
      console.log("⚠️ Paddle script already loaded, skipping...");
      return;
    }

    console.log("⬇️ Loading Paddle SDK...");
    console.log("🔑 Client token (from env):", clientToken);
    console.log("🌍 Paddle environment (from env):", env);
    console.log("🏠 Current domain (window.location.origin):", window.location.origin);
    console.log("📄 Full page URL (window.location.href):", window.location.href);

    const script = document.createElement("script");
    script.id = "paddle-js";
    script.src =
      env === "sandbox"
        ? "https://sandbox-cdn.paddle.com/paddle/v2/paddle.js"
        : "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    script.onload = () => {
      if (window.Paddle) {
        console.log("✅ Paddle SDK script loaded, calling Paddle.Setup...");

        try {
          window.Paddle.Setup({
            token: clientToken,
          });

          console.log("🔧 Paddle.Setup called successfully with:", {
            tokenPresent: !!clientToken,
            env,
            origin: window.location.origin,
          });
        } catch (err) {
          console.error("🔥 Error calling Paddle.Setup:", err);
        }
      } else {
        console.error("❌ Paddle SDK did not attach to window");
      }
    };

    script.onerror = () => {
      console.error("🔥 Failed to load Paddle SDK script");
    };

    document.body.appendChild(script);
  }, [clientToken, env]);
};
