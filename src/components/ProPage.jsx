import React from "react";
import "./ProPage.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function ProPage() {
  const navigate = useNavigate();

  return (
    <div className="pro-wrapper">
      {/* Navbar */}
      <Navbar />

      {/* Main body: Sidebar + Right Content */}
      <div className="pro-body">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Content */}
        <div className="pro-container">
          <h2 className="pro-heading">Available Plans</h2>

          {/* Plan Cards */}
          <div className="pro-cards">

            {/* Card 1 */}
            <div className="pro-card">
              <h3>Pro Individual</h3>
              <ul>
                <li>✔ Ad-free Music</li>
                <li>✔ Unlimited Downloads</li>
                <li>✔ Unlimited Hire tunes</li>
                <li>✔ 2X Better sound Quality</li>
              </ul>

              <div className="price-box">
                <span className="old-price">₹109</span>
              </div>

              <button
                className="price-btn"
                onClick={() =>
                  navigate("/payment", {
                    state: { price: 9, plan: "Pro Individual" }
                  })
                }
              >
                ₹9 for 2 months
              </button>
            </div>

            {/* Card 2 */}
            <div className="pro-card">
              <h3>Pro Student</h3>
              <ul>
                <li>✔ Ad-free Music</li>
                <li>✔ Unlimited Downloads</li>
                <li>✔ Unlimited Hire tunes</li>
                <li>✔ 2X Better sound Quality</li>
              </ul>

              <div className="price-box">
                <span className="old-price">₹99</span>
              </div>

              <button
                className="price-btn"
                onClick={() =>
                  navigate("/payment", {
                    state: { price: 49, plan: "Pro Student" }
                  })
                }
              >
                ₹49 / month
              </button>
            </div>

            {/* Card 3 */}
            <div className="pro-card">
              <h3>Pro Lite</h3>
              <ul>
                <li>✔ Ad-free Music</li>
                <li>✔ Unlimited Downloads</li>
              </ul>

              <button
                className="price-btn"
                onClick={() =>
                  navigate("/payment", {
                    state: { price: 29, plan: "Pro Lite" }
                  })
                }
              >
                ₹29 / Week
              </button>
            </div>

          </div>

          {/* Footer aligned with the right content */}
          <div className="pro-footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProPage;