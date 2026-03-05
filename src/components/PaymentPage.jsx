import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"; 
import "./PaymentPage.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const price = location.state?.price || 0;
  const plan = location.state?.plan || "Pro Plan";

  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    holderName: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Card number must be 16 digits";

    if (!formData.holderName) newErrors.holderName = "Card holder name is required";

    if (!formData.expiry) newErrors.expiry = "Expiry date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry))
      newErrors.expiry = "Format must be MM/YY";

    if (!formData.cvv) newErrors.cvv = "CVV is required";
    else if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/payment-success", { state: { price, plan } });
    }
  };

  return (
    <div className="payment-wrapper">
      <Navbar />

      <div className="payment-body">
        <Sidebar />

        {/* Right panel */}
        <div className="payment-right">
          <div className="payment-main">
            <div className="payment-card">
              <h2 className="payment-heading">{plan} Subscription</h2>
              <p className="price-display">Amount: ₹{price}</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error-input" : ""}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    maxLength="16"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? "error-input" : ""}
                  />
                  {errors.cardNumber && (
                    <span className="error-text">{errors.cardNumber}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Card Holder Name</label>
                  <input
                    type="text"
                    name="holderName"
                    value={formData.holderName}
                    onChange={handleChange}
                    className={errors.holderName ? "error-input" : ""}
                  />
                  {errors.holderName && (
                    <span className="error-text">{errors.holderName}</span>
                  )}
                </div>

                <div className="row">
                  <div className="form-group half">
                    <label>Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      className={errors.expiry ? "error-input" : ""}
                    />
                    {errors.expiry && <span className="error-text">{errors.expiry}</span>}
                  </div>

                  <div className="form-group half">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      maxLength="3"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={errors.cvv ? "error-input" : ""}
                    />
                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                  </div>
                </div>

                <button type="submit" className="pay-btn">
                  Pay ₹{price}
                </button>
              </form>
            </div>

            {/* Footer below form */}
            <div className="payment-footer">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;