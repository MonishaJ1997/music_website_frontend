import "./Sidebar.css";
import { useNavigate } from "react-router-dom";



 

function Sidebar({ isOpen, closeSidebar }){
  const navigate = useNavigate();
const handleNavigate = (path) => {
    navigate(path);
    if (closeSidebar) closeSidebar(); // optional: close sidebar when navigating
  };
  const handleNewPlaylist = () => {
    // you can pass any album id here
    navigate("/album/21");  
    
  };
  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <h4>Browse</h4>
      <ul>
         <li onClick={() => handleNavigate("/")}>Home</li>
        <li onClick={() => handleNavigate("/new-release")}>New release</li>
        <li onClick={() => handleNavigate("/top-charts")}>Top Charts</li>
        <li onClick={() => handleNavigate("/top-playlists")}>Top Playlists</li>
       
        <li onClick={() => handleNavigate("/top-artists")}>Top Artists</li>
      </ul>

      <h4>Library</h4>
      <ul>
        <li>History</li>
        <li onClick={() => handleNavigate("/liked-songs")}>Liked Songs</li>
        <li>Albums</li>
        <li>Artists</li>
      </ul>

      <button className="playlist-btn"onClick={handleNewPlaylist}>+ New Play List</button>
    </div>
  );
}

export default Sidebar;
