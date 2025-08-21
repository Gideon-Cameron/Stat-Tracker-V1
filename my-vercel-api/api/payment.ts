import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    // Example Chapa API integration
    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CHAPA_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount: "100",
        currency: "ETB",
        email: "customer@example.com",
        tx_ref: `tx-${Date.now()}`,
        callback_url: "https://your-frontend.com/payment-success"
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
