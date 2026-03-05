import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
   const BASE_URL = "http://127.0.0.1:8000";
  const [banner, setBanner] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch banner
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/auth-banner/`)
      .then((res) => {
        setBanner(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Banner response:", banner);
  }, [banner]);

  // 🔹 Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/login/`,
        { email, password },
        { withCredentials: true }
      );

      // ✅ Store login data properly
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("isLoggedIn", "true");

      // ✅ Force update for other components listening to storage
      window.dispatchEvent(new Event("storage"));

      // ✅ Redirect after login
      navigate("/");

    } catch (error) {
      console.log("Login error:", error.response?.data);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>Welcome to Tune Hive</h1>
        <p>Login or sign up with your email</p>

        {/* ❌ You don’t need manual name input for login,
            but I kept it since you had it */}
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button className="login-btn" onClick={handleLogin}>
          Continue
        </button>

        

        <div className="social-login">
          <button>Google</button>
          <button>Facebook</button>
        </div>

        {/* Navigate to Register */}
        <p className="login-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Sign up
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

export default LoginPage;