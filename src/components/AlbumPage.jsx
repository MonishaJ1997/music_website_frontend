import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./AlbumPage.css";
import Footer from "./Footer";

function AlbumPage() {

  const BASE_URL = "http://127.0.0.1:8000";
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showDailyLimitPopup, setShowDailyLimitPopup] = useState(false);
  const [currentTrackUri, setCurrentTrackUri] = useState(null);
  const [allSongs, setAllSongs] = useState([]);

  // ================= Auth Check =================
  useEffect(() => {
    const checkLogin = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    };

    checkLogin();
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setShowLoginPopup(false); // hide login popup
    }
  }, [isLoggedIn]);

  // ================= Fetch Album Songs =================
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BASE_URL}/api/album/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
        setSongs([]);
        setLoading(false);
      });
  }, [id]);

  // ================= Fetch All Songs =================
  useEffect(() => {
    fetch(`${BASE_URL}/api/songs/`)
      .then((res) => res.json())
      .then((data) => setAllSongs(data))
      .catch((err) => console.log(err));
  }, []);

  const uniqueFilms = Array.from(
    new Map(allSongs.map((song) => [song.film, song])).values()
  );

  const filterSection = (sectionId) =>
    uniqueFilms.filter((film) => film.film_section == sectionId);

  // ================= Play Song =================
  const handlePlay = (song) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    // ✅ DAILY PLAY LIMIT
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const dailyPlays = JSON.parse(localStorage.getItem("dailyPlays") || "{}");
    const todayCount = dailyPlays[today] || 0;

    if (todayCount >= 20) {
      setShowDailyLimitPopup(true);
      return;
    }

    dailyPlays[today] = todayCount + 1;
    localStorage.setItem("dailyPlays", JSON.stringify(dailyPlays));

    if (!song.spotify_uri) {
      alert("Spotify URI not available");
      return;
    }

    setCurrentTrackUri(song.spotify_uri);
  };

  const renderSpotifyPlayer = () => {
    if (!currentTrackUri || !currentTrackUri.includes(":")) return null;
    const parts = currentTrackUri.split(":");
    const cleanId = parts[2].split("?")[0];

    return (
      <iframe
        src={`https://open.spotify.com/embed/track/${cleanId}`}
        width="300"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        title="Spotify Player"
      />
    );
  };

  // ================= Carousel Component =================
  const CarouselSection = ({ title, data, limit }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      setItems(data);
    }, [data]);

    const moveRight = () => {
      if (!items.length) return;
      setItems([...items.slice(1), items[0]]);
    };

    const moveLeft = () => {
      if (!items.length) return;
      setItems([items[items.length - 1], ...items.slice(0, -1)]);
    };

    return (
      <div className="sections-wrapper">
        <h2>{title}</h2>
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={moveLeft}>
            ◀
          </button>
          <div className="songs-row">
            {items.slice(0, limit).map((song) => (
              <div className="song-card" key={song.id}>
                <img
                  src={`${BASE_URL}${song.film_image}`}
                  alt={song.title}
                />
                <div className="song-card-content">
                  <h4>{song.film_name}</h4>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-btn right" onClick={moveRight}>
            ▶
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="layout">
      <Navbar />
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">
        {/* ================= ALBUM HEADER ================= */}
        <div
          className="album-top"
          style={{
            backgroundImage:
              songs.length > 0
                ? `url(${BASE_URL}${songs[0].film_image})`
                : "",
          }}
        >
          <div className="album-overlay">
            <div className="album-left">
              {songs.length > 0 && (
                <>
                  <img
                    src={`${BASE_URL}${songs[0].film_image}`}
                    alt={songs[0].title}
                    className="album-cover"
                  />
                  <h1>{songs[0].album_title || songs[0].film_name}</h1>
                  <p>
                    by {songs[0].artist || "Various Artists"} •{" "}
                    {songs.length} songs
                  </p>
                </>
              )}
            </div>

            <div className="album-right">
              {loading ? (
                <p style={{ color: "white" }}>Loading songs...</p>
              ) : songs.length > 0 ? (
                songs.map((song, index) => (
                  <div className="track-row" key={song.id}>
                    <span>{index + 1}</span>
                    <span>{song.title}</span>
                    <span>{song.duration || "5:00"}</span>
                    <button onClick={() => handlePlay(song)}>▶️ Play</button>
                  </div>
                ))
              ) : (
                <p style={{ color: "white" }}>No songs available</p>
              )}

              {renderSpotifyPlayer()}
            </div>
          </div>
        </div>

        {/* ================= NEW SECTIONS BELOW ================= */}
        <CarouselSection
          title="TOP PLAYLISTS"
          data={filterSection(4)}
          limit={6}
        />
        <CarouselSection
          title="TOP ARTISTS"
          data={filterSection(6)}
          limit={6}
        />

        <Footer />
      </div>

      {/* ================= LOGIN POPUP ================= */}
      {showLoginPopup && (
        <div className="popup-overlay" onClick={() => setShowLoginPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            {songs.length > 0 && (
              <img
                src={`${BASE_URL}${songs[0].film_image}`}
                alt={songs[0].title}
                className="popup-image"
              />
            )}

            <div className="popup-content">
              <h2>Start listening with a free account</h2>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowLoginPopup(false);
                  navigate("/register");
                }}
              >
                Sign up for free
              </button>
              <button className="secondary-btn">Download app</button>
              <p className="login-text">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setShowLoginPopup(false);
                    navigate("/login");
                  }}
                >
                  Log in
                </span>
              </p>
            </div>

            <div
              className="popup-close"
              onClick={() => setShowLoginPopup(false)}
            >
              ✖
            </div>
          </div>
        </div>
      )}

      {/* ================= LIMIT POPUP ================= */}
      {showDailyLimitPopup && (
  <div className="daily-limit-overlay" onClick={() => setShowDailyLimitPopup(false)}>
    <div className="daily-limit-box" onClick={(e) => e.stopPropagation()}>
      <div className="daily-limit-icon">⚠️</div>
      <div className="daily-limit-content">
        <h2>Daily Play Limit Reached</h2>
        <p>You have played 20 songs today. Upgrade to continue listening unlimited!</p>
        <button
          className="upgrade-btn"
          onClick={() => {
            setShowDailyLimitPopup(false);
            navigate("/pro"); // or payment page
          }}
        >
          Upgrade Now
        </button>
      </div>
      <div className="daily-limit-close" onClick={() => setShowDailyLimitPopup(false)}>✖</div>
    </div>
  </div>
)}
    </div>
  );
}

export default AlbumPage;