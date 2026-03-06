import { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ searchTerm, setSearchTerm }) {
  const BASE_URL = "http://127.0.0.1:8000";
  const [showMusic, setShowMusic] = useState(false);
  const [showPodcast, setShowPodcast] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  // 🔥 Search API call
  useEffect(() => {

    const fetchSongs = async () => {
      try {
        if (searchTerm.trim() === "") {
          await axios.get(`${BASE_URL}/api/songs/`);
        } else {
          await axios.get(
            `${BASE_URL}/api/songs/search/?search=${searchTerm}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSongs();

  }, [searchTerm]);

  return (
    <div className="navbar">

      {/* LEFT LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        TUNE HIVE
      </div>

      {/* RIGHT TOGGLE ICON (Mobile Only) */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* DESKTOP NAV LINKS */}
      <div className="nav-links">
        <div
          className="dropdown"
          onMouseEnter={() => setShowMusic(true)}
          onMouseLeave={() => setShowMusic(false)}
        >
          <span>Music ▾</span>
          {showMusic && (
            <div className="dropdown-menu">
              <p>Latest Songs</p>
              <p>Top Charts</p>
              <p>Top Artists</p>
            </div>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowPodcast(true)}
          onMouseLeave={() => setShowPodcast(false)}
        >
          <span>Podcasts ▾</span>
          {showPodcast && (
            <div className="dropdown-menu">
              <p>Trending Podcasts</p>
              <p>New Episodes</p>
            </div>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowPro(true)}
          onMouseLeave={() => setShowPro(false)}
        >
          <span
            onClick={() => navigate("/pro")}
            style={{ cursor: "pointer" }}
          >
            Pro ▾
          </span>
          {showPro && (
            <div className="dropdown-menu">
              <p>Pro-Individual</p>
              <p>Pro-lite</p>
              <p>Pro-student</p>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP SEARCH */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* DESKTOP RIGHT SIDE */}
      <div className="nav-right">
        <span className="music-lang">Music language</span>

        {userName ? (
          <>
            <span
              className="username"
              onClick={() => navigate("/profile")}
              style={{ cursor: "pointer" }}
            >
              👋 {userName}
            </span>

            <button
              className="logout-btn"
              onClick={async () => {
                await fetch(`${BASE_URL}/api/logout/`, {
                  method: "POST",
                  
                });

                localStorage.removeItem("userName");
                localStorage.removeItem("isLoggedIn");

                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span onClick={() => navigate("/login")}>Login</span>
            <button
              className="signup-btn"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </>
        )}
      </div>

      {/* ✅ MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">

          <div className="nav-links-mobile">
            <p>Music</p>
            <p>Podcasts</p>
            <p onClick={() => navigate("/pro")}>Pro</p>
          </div>

          <div className="search-bar-mobile">
            <input
              type="text"
              placeholder="Search songs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="nav-right-mobile">
            {userName ? (
              <>
                <p onClick={() => navigate("/profile")}>
                  👋 {userName}
                </p>

                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <p onClick={() => navigate("/login")}>Login</p>
                <button
                  className="signup-btn"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

export default Navbar;