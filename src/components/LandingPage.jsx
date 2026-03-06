import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./LandingPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function LandingPage({ likedSongs, setLikedSongs }) {
  const BASE_URL = "https://music-website-backend-ep97.onrender.com";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const goToAlbum = (e, song) => {
    e.stopPropagation();
    console.log("Section:", song.section);
    console.log("Song ID:", song.id);
    navigate(`/album/${song.film}`, { state: song });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter((song) =>
    song.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/songs/`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const uniqueFilms = Array.from(
    new Map(songs.map((song) => [song.film, song])).values()
  );

  const filterSection = (id) =>
    uniqueFilms.filter((film) => film.film_section == id);

  // ❤️ Toggle Like
  const toggleLike = (song) => {
    const exists = likedSongs.find((s) => s.id === song.id);

    if (exists) {
      setLikedSongs(likedSongs.filter((s) => s.id !== song.id));
    } else {
      setLikedSongs([...likedSongs, song]);
    }
  };

  const isLiked = (id) => likedSongs.some((s) => s.id === id);

  // ✅ Format Fans
  const formatFans = (num) => {
    if (!num) return "0 Fans";
    if (num >= 1000000)
      return (num / 1000000).toFixed(1).replace(".0", "") + "M Fans";
    if (num >= 1000)
      return (num / 1000).toFixed(1).replace(".0", "") + "K Fans";
    return num + " Fans";
  };

  // ✅ Carousel
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
                <img
                  src={`${BASE_URL}${song.film_image}`}
                  alt={song.title || "Music"}
                />

                {/* ❤️ Heart Button */}
                <div
                  className="heart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song);
                  }}
                >
                  {isLiked(song.id) ? "❤️" : "🤍"}
                </div>

                {/* Hover Play Button */}
                <div className="play-overlay">
                  <div
                    className="play-btn"
                    onClick={(e) => goToAlbum(e, song)}
                  >
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
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <>
        <Sidebar isOpen={sidebarOpen} />

        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </>

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
                    <img
                      src={`${BASE_URL}${song.film_image}`}
                      alt={song.title}
                    />

                    {/* ❤️ Heart */}
                    <div
                      className="heart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(song);
                      }}
                    >
                      {isLiked(song.id) ? "❤️" : "🤍"}
                    </div>

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
          <>
            <CarouselSection
              title="LATEST SONGS"
              data={filterSection(1)}
              limit={5}
              showDetails={false}
            />

            <CarouselSection
              title="TRENDING NOW"
              data={filterSection(2)}
              limit={7}
              showDetails={true}
            />

            <CarouselSection
              title="TOP CHARTS"
              data={filterSection(3)}
              limit={7}
              showDetails={true}
            />

            <CarouselSection
              title="TOP PLAYLISTS"
              data={filterSection(4)}
              limit={7}
              showDetails={true}
            />

            <CarouselSection
              title="TOP ARTISTS"
              data={filterSection(6)}
              limit={7}
              showDetails={true}
            />
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
