import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoginPage.css"; // reuse same CSS
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const BASE_URL = "http://127.0.0.1:8000";
  const [banner, setBanner] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch banner (same as login)
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/auth-banner/`)
      .then((res) => setBanner(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  // 🔹 Handle Register
  const handleRegister = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/register/`, {
        name:name,
        email: email,
        password: password,
      });

      alert("Registration successful ✅");

      // 👉 Redirect to login
      navigate("/login");
    } 
    catch (error) {
  console.log("ERROR:", error.response?.data);
  alert(JSON.stringify(error.response?.data));
}
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>Create your account</h1>
        <p>Sign up with your email</p>
        <input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* REGISTER BUTTON */}
        <button className="login-btn" onClick={handleRegister}>
          Sign Up
        </button>

        

        {/* 🔹 Go to Login */}
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="login-right">
        {banner && (
           <img
  src={banner?.image}
  alt="banner"
  
/>
        )}
      </div>

    </div>
  );
};

export default RegisterPage;