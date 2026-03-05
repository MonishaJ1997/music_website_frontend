import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AlbumPage from "./components/AlbumPage";
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage";
import ProPage from "./components/ProPage";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";
import ProfilePage from "./components/ProfilePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pro" element={<ProPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;