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

    // Logs for debugging
    console.log("⬇️ Loading Paddle SDK...");
    console.log("🔑 Full client token (from env):", clientToken);
    console.log("🔑 Token prefix:", clientToken?.slice(0, 5));
    console.log("🌍 Paddle environment (from env):", env);
    console.log("🏠 Current domain (window.location.origin):", window.location.origin);
    console.log("📄 Full page URL (window.location.href):", window.location.href);

    // Runtime warnings
    if (window.location.origin.startsWith("https://")) {
      console.warn(
        "⚠️ WARNING: window.location.origin includes https:// — Paddle domain approvals usually require only the bare hostname (e.g. stats-beta-v1.netlify.app). Double-check your approved domains in Paddle Dashboard."
      );
    }

    if (env === "sandbox" && !clientToken.startsWith("test_")) {
      console.error(
        "❌ ENV/TOKEN MISMATCH: You are in sandbox mode but using a non-sandbox client token!"
      );
    }
    if (env !== "sandbox" && clientToken.startsWith("test_")) {
      console.error(
        "❌ ENV/TOKEN MISMATCH: You are in production mode but using a sandbox (test_) client token!"
      );
    }

    // Inject Paddle script
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
            tokenPrefix: clientToken?.slice(0, 5),
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
