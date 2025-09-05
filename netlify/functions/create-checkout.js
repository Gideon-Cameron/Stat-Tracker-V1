// netlify/functions/create-checkout.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    console.log("📩 Incoming event body:", event.body);

    const { priceId, firebaseUserId } = JSON.parse(event.body);

    // Ensure we have API key
    if (!process.env.PADDLE_API_KEY) {
      console.error("❌ Missing Paddle API key in environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Paddle API key" }),
      };
    }

    // Build request body for Paddle Transactions API
    const body = {
      items: [{ price_id: priceId, quantity: 1 }],
      customer: {
        email: "test@example.com", // TODO: replace with real user email later
      },
      passthrough: JSON.stringify({ firebaseUserId }),
    };

    console.log("➡️ Sending request to Paddle:", body);

    const res = await fetch("https://sandbox-api.paddle.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("📦 Paddle API response:", data);

    if (!res.ok) {
      console.error("❌ Paddle API error:", data);
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data }),
      };
    }

    // ✅ Return the transaction ID (token) to frontend.
    return {
      statusCode: 200,
      body: JSON.stringify({ token: data.data.id }),
    };
  } catch (err) {
    console.error("🔥 Netlify function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
