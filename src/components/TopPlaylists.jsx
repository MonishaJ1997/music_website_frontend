import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
 // you can reuse LandingPage.css

function TopPlaylists() {
  const BASE_URL = "https://music-website-backend-ep97.onrender.com";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Navigate to album/song page
  const goToAlbum = (e, song) => {
    e.stopPropagation();
    navigate(`/album/${song.film}`, { state: song });
  };

  // Filtered search results
  const filteredSongs = songs.filter((song) =>
    song.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch songs from backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/songs/`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Only Top Playlists songs (section_id = 4)
  const topPlaylistSongs = songs.filter((song) => song.film_section === 4);

  // Format fans count
  const formatFans = (num) => {
    if (!num) return "0 Fans";
    if (num >= 1000000)
      return (num / 1000000).toFixed(1).replace(".0", "") + "M Fans";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "K Fans";
    return num + " Fans";
  };

  // Carousel component
  const CarouselSection = ({ title, data, limit, showDetails }) => {
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
      <div className="section-wrapper">
        <h2>{title}</h2>
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={moveLeft}>
            ◀
          </button>

          <div className="songs-row">
            {items.slice(0, limit).map((song) => (
              <div
                className="song-card"
                key={song.id}
                onClick={() => console.log("Play:", song.title)}
              >
                <img src={`${BASE_URL}${song.film_image}`} alt={song.title} />
                <div className="play-overlay">
                  <div className="play-btn" onClick={(e) => goToAlbum(e, song)}>
                    ▶
                  </div>
                </div>
                {showDetails && (
                  <div className="song-card-content">
                    <h4>{song.title || "Untitled Song"}</h4>
                    <p>{formatFans(song.fans)}</p>
                  </div>
                )}
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
      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Sidebar */}
      <>
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </>

      {/* Main content */}
      <div className="main-content">
        {searchTerm ? (
          <div className="section-wrapper">
            <h2>SEARCH RESULTS</h2>
            <div className="songs-row">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <div
                    className="song-card"
                    key={song.id}
                    onClick={(e) => goToAlbum(e, song)}
                  >
                    <img src={`${BASE_URL}${song.film_image}`} alt={song.title} />
                    <div className="song-card-content">
                      <h4>{song.title}</h4>
                      <p>{formatFans(song.fans)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No songs found</p>
              )}
            </div>
          </div>
        ) : (
          <CarouselSection
            title="TOP PLAYLISTS"
            data={topPlaylistSongs}
            limit={6}
            showDetails={true}
          />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default TopPlaylists;
