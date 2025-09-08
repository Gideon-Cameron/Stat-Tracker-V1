import React from "react";
import { Link } from "react-router-dom";

const Cancel: React.FC = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>❌ Payment Canceled</h1>
      <p>Your checkout was canceled. You can try again anytime.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default Cancel;
