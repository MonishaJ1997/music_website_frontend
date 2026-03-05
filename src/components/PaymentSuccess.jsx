import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "./Footer";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const price = location.state?.price || 0;
  const plan = location.state?.plan || "Pro Plan";

  return (
    <div className="success-wrapper">
      <Navbar />

      <div className="success-body">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Side */}
        <div className="success-main">
          <div className="success-card">
            <h1 className="success-title">Payment Successful!</h1>

            <p className="success-text">
              Your payment for the {plan} has been successfully processed.
              You now have access to all features.
            </p>

            <h3 className="details-title">Plan Details</h3>

            <div className="details-grid">
              <div className="detail-box">
                <span>Plan Name</span>
                <strong>{plan}</strong>
              </div>

              <div className="detail-box">
                <span>Billing Type</span>
                <strong>Monthly</strong>
              </div>

              <div className="detail-box">
                <span>Amount Paid</span>
                <strong>₹{price}.00</strong>
              </div>

              <div className="detail-box">
                <span>Next Payment Date</span>
                <strong>Jan 31, 2027</strong>
              </div>
            </div>

            <div className="btn-row">
              <button
                className="go-player-btn"
                onClick={() => navigate("/")}
              >
                Go to Player
              </button>

              <button className="account-btn">
                View Account Details
              </button>
            </div>
          </div>

          {/* Footer inside right panel */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;