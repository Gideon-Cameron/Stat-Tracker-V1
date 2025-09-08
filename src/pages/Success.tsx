import React from "react";
import { Link } from "react-router-dom";

const Success: React.FC = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>✅ Payment Successful</h1>
      <p>Thank you for your purchase! Your premium features are now unlocked.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default Success;
