import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import LandingPage from "./components/LandingPage";
import AlbumPage from "./components/AlbumPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProPage from "./components/ProPage";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";
import ProfilePage from "./components/ProfilePage";
import NewRelease from "./components/NewRelease";
import TopCharts from "./components/TopCharts";
import TopPlaylists from "./components/TopPlaylists";
import TopArtists from "./components/TopArtists";
import LikedSongs from "./components/LikedSongs"; // Page for liked songs

function App() {
  // ✅ Lifted liked songs state so all pages can access
  const [likedSongs, setLikedSongs] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={<LandingPage likedSongs={likedSongs} setLikedSongs={setLikedSongs} />}
        />

        {/* Album Page */}
        <Route path="/album/:id" element={<AlbumPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Pro / Payment */}
        <Route path="/pro" element={<ProPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Music Sections */}
        <Route
          path="/new-release"
          element={<NewRelease likedSongs={likedSongs} setLikedSongs={setLikedSongs} />}
        />
        <Route
          path="/top-charts"
          element={<TopCharts likedSongs={likedSongs} setLikedSongs={setLikedSongs} />}
        />
        <Route
          path="/top-playlists"
          element={<TopPlaylists likedSongs={likedSongs} setLikedSongs={setLikedSongs} />}
        />
        <Route
          path="/top-artists"
          element={<TopArtists likedSongs={likedSongs} setLikedSongs={setLikedSongs} />}
        />

        {/* Liked Songs Page */}
        <Route path="/liked-songs" element={<LikedSongs likedSongs={likedSongs} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;