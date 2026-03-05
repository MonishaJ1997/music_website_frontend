import "./Sidebar.css";
import { useNavigate } from "react-router-dom";



 

function Sidebar({ isOpen, closeSidebar }){
  const navigate = useNavigate();

  const handleNewPlaylist = () => {
    // you can pass any album id here
    navigate("/album/21");  
    
  };
  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <h4>Browse</h4>
      <ul>
        <li>New Release</li>
        <li>Top Charts</li>
        <li>Top Playlists</li>
        <li>Podcasts</li>
        <li>Top Artists</li>
      </ul>

      <h4>Library</h4>
      <ul>
        <li>History</li>
        <li>Liked Songs</li>
        <li>Albums</li>
        <li>Artists</li>
      </ul>

      <button className="playlist-btn"onClick={handleNewPlaylist}>+ New Play List</button>
    </div>
  );
}

export default Sidebar;