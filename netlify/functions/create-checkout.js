// netlify/functions/create-checkout.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    console.log("📩 Incoming event body:", event.body);

    // Parse incoming request
    let priceId, firebaseUserId;
    try {
      ({ priceId, firebaseUserId } = JSON.parse(event.body));
    } catch (parseErr) {
      console.error("❌ Failed to parse request body:", parseErr);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON in request body" }),
      };
    }

    // Ensure API key is set
    if (!process.env.PADDLE_API_KEY) {
      console.error("❌ Missing Paddle API key in environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Paddle API key" }),
      };
    }
    console.log("🔑 Paddle API key exists? ", !!process.env.PADDLE_API_KEY);

    // Sandbox vs Production URL
    const env = process.env.VITE_PADDLE_ENV || "sandbox";
    const apiUrl =
      env === "sandbox"
        ? "https://sandbox-api.paddle.com/transactions"
        : "https://api.paddle.com/transactions";

    // Build Paddle request body
    const body = {
      items: [{ price_id: priceId, quantity: 1 }],
      customer: {
        email: "test@example.com", // TODO: replace with real user email
      },
      passthrough: JSON.stringify({ firebaseUserId }),
      success_url: "https://stats-beta-v1.netlify.app/success",
      cancel_url: "https://stats-beta-v1.netlify.app/cancel",
    };

    console.log("➡️ Sending request to Paddle:", JSON.stringify(body, null, 2));
    console.log("🌍 Using Paddle API URL:", apiUrl);

    // Call Paddle API
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    console.log("📊 Paddle response status:", res.status, res.statusText);
    console.log(
      "📑 Paddle response headers:",
      Object.fromEntries(res.headers)
    );

    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      console.error("❌ Failed to parse Paddle JSON response", jsonErr);
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Invalid JSON from Paddle" }),
      };
    }

    console.log("📦 Full Paddle API response:", JSON.stringify(data, null, 2));

    // If Paddle returned error
    if (!res.ok) {
      console.error("❌ Paddle API error (status):", res.status);
      console.error("❌ Paddle API error (body):", data);
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data }),
      };
    }

    // ✅ Success — send back the transaction id
    if (data?.data?.id) {
      console.log("✅ Returning transaction token:", data.data.id);
      return {
        statusCode: 200,
        body: JSON.stringify({ token: data.data.id, raw: data }),
      };
    } else {
      console.warn("⚠️ Paddle response missing expected `data.id` field");
      return {
        statusCode: 200,
        body: JSON.stringify({ raw: data }),
      };
    }
  } catch (err) {
    console.error("🔥 Netlify function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
