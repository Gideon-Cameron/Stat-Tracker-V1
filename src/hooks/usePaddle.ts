import { useEffect } from "react";

export const usePaddle = (vendorId: string, sandbox: boolean = true) => {
  useEffect(() => {
    // Load Paddle script if not already loaded
    if (!document.getElementById("paddle-js")) {
      const script = document.createElement("script");
      script.id = "paddle-js";
      script.src = "https://cdn.paddle.com/paddle/paddle.js";
      script.async = true;
      script.onload = () => {
        // @ts-expect-error - Paddle is loaded globally
        if (window.Paddle) {
          // @ts-expect-error Paddle is loadiong the window
          window.Paddle.Environment.set(sandbox ? "sandbox" : "production");
          // @ts-expect-error Stop asking
          window.Paddle.Setup({ vendor: vendorId });
        }
      };
      document.body.appendChild(script);
    }
  }, [vendorId, sandbox]);
};
