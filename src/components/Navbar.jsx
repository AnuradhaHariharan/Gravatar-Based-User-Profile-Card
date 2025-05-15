import React from "react";
import "./styles/Navbar.css";

export default function Navbar({ profile }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Gravatar</div>
      {profile && (
          <div className="profile-info">
         <div className="profile-info"></div>
          <img
            src={profile.gravatar.image}
            alt="Profile"
            className="navbar-profile-image"
          />
          <p>{profile.gravatar.username || profile.username}</p>
          </div>
      )}
     
    </nav>
  );
}

