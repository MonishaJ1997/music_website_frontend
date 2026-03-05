import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./ProfilePage.css";

function ProfilePage() {
  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  return (
    <div className="layouts">
      <Navbar />

      <div className="body-wrapper">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Right content */}
        <div className="main-content">
          <h1 className="profile-title">Profile</h1>

          <div className="profile-container">

            {/* LEFT PROFILE CARD */}
            <div className="profile-card">
              <div className="profile-avatar">👤</div>

              <div className="profile-info">
                <h3>User Name</h3>
                <p>{userName || "No Name"}</p>

                <h3>Email</h3>
                <p>{email || "No Email"}</p>
              </div>

              <div className="profile-buttons">
                <button>Edit Profile</button>
                <button>Change Password</button>
              </div>
            </div>

            {/* RIGHT SETTINGS CARD */}
            <div className="settings-card">
              <h2>Subscription</h2>
              <p>Plan: <strong>Premium</strong></p>
              <p>Renewal: Jan 31, 2027</p>

              <button className="manage-btn">
                Manage Subscription
              </button>
            </div>

          </div>

          {/* Footer aligned with the right content only */}
          <div className="profile-footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;