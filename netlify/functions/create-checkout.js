import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { priceId, firebaseUserId } = JSON.parse(event.body);

    // Call Paddle API to create a checkout session
    const response = await fetch("https://sandbox-api.paddle.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      },
      body: JSON.stringify({
        customer: {
          email: "test@example.com", // replace later with real user email
        },
        items: [
          {
            price_id: priceId,
            quantity: 1,
          },
        ],
        passthrough: JSON.stringify({ firebaseUserId }),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Paddle API error:", data);
      return {
        statusCode: response.status,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ token: data.id }), // transaction token
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
}
