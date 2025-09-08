export {};

declare global {
  interface Window {
    Paddle?: {
      Setup: (options: { environment: string; token: string }) => void;
      Checkout?: {
        open: (options: Record<string, unknown>) => void;
        close: () => void;
      };
    };
  }
}
