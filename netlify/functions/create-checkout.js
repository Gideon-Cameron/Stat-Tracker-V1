// netlify/functions/create-checkout.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    console.log("🚀 --- Incoming Paddle Checkout Request ---");

    console.log("📩 Raw incoming event body:", event.body);
    console.log("🌐 Request headers:", event.headers);
    console.log("🌍 Request origin (Referer):", event.headers?.referer || "❌ none");
    console.log("🖥️ Host header (domain Netlify served):", event.headers?.host || "❌ none");

    // Parse incoming request
    let priceId, firebaseUserId;
    try {
      ({ priceId, firebaseUserId } = JSON.parse(event.body));
      console.log("✅ Parsed request body:", { priceId, firebaseUserId });
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
    console.log("🔑 Paddle API key present? ", !!process.env.PADDLE_API_KEY);

    // Log env vars we rely on
    const env = process.env.VITE_PADDLE_ENV || "sandbox";
    console.log("🌍 Paddle environment (from env):", env);

    // Which Paddle endpoint are we calling?
    const apiUrl =
      env === "sandbox"
        ? "https://sandbox-api.paddle.com/transactions"
        : "https://api.paddle.com/transactions";

        console.log("🔍 Effective env in function:", env);
        console.log("🔍 Using Paddle API key prefix:", process.env.PADDLE_API_KEY?.slice(0, 5));
    console.log("🌐 Paddle API URL being used:", apiUrl);

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

    console.log("➡️ Sending request body to Paddle:", JSON.stringify(body, null, 2));

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

    // Log response headers for debugging
    try {
      console.log("📑 Paddle response headers:", Object.fromEntries(res.headers));
    } catch {
      console.log("📑 Paddle response headers could not be read.");
    }

    // Read raw response text (sometimes errors are not valid JSON)
    const text = await res.text();
    console.log("📦 Raw Paddle API response text:", text);

    let data;
    try {
      data = JSON.parse(text);
      console.log("✅ Parsed Paddle API response JSON:", JSON.stringify(data, null, 2));
    } catch {
      data = { raw: text };
      console.warn("⚠️ Paddle response was not JSON. Returning raw text.");
    }

    // If Paddle returned error
    if (!res.ok) {
      console.error("❌ Paddle API error (status):", res.status);
      console.error("❌ Paddle API error (body):", data);
      return {
        statusCode: res.status,
        body: JSON.stringify({
          error: "Paddle API request failed",
          status: res.status,
          details: data,
        }),
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
      console.warn("⚠️ Paddle response missing expected `data.id` field:", data);
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
