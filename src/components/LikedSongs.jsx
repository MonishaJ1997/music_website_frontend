import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./LikedSongs.css";
import { useNavigate } from "react-router-dom";

function LikedSongs({ likedSongs }) {
  const BASE_URL = "http://127.0.0.1:8000";
  const navigate = useNavigate();

  const goToAlbum = (song) => {
    navigate(`/album/${song.film}`, { state: song });
  };

  return (
    <div className="layouts">
      <Navbar />

      <div className="body-wrapper">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Content */}
        <div className="main-content">
          <h1 className="liked-title">Liked Songs</h1>

          {likedSongs.length === 0 ? (
            <p>No liked songs yet.</p>
          ) : (
            <div className="songsed-row">
              {likedSongs.map((song) => (
                <div
                  className="songsed-card"
                  key={song.id}
                  onClick={() => goToAlbum(song)}
                >
                  <img
                    src={`${BASE_URL}${song.film_image}`}
                    alt={song.title || "Music"}
                  />

                  <div className="songsed-card-content">
                    <h4>{song.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer only inside right content */}
          <div className="liked-footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikedSongs;