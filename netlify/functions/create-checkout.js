// netlify/functions/create-checkout.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { priceId, firebaseUserId } = JSON.parse(event.body);

    const res = await fetch("https://sandbox-api.paddle.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      },
      body: JSON.stringify({
        items: [{ price_id: priceId, quantity: 1 }],
        passthrough: JSON.stringify({ firebaseUserId }),
      }),
    });

    const data = await res.json();
    console.log("📦 Paddle API response:", data);

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data }),
      };
    }

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
