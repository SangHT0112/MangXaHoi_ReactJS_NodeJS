import React from "react";
import { FaHome, FaUsers, FaYoutube, FaStore, FaUserPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const MainMenu = () => {
  const location = useLocation();

  return (
    <div className="block2">
      <a href="/" className={location.pathname === "/" ? "active" : ""}>
        <FaHome />
      </a>

      <a
        href="/add-friend"
        className={location.pathname === "/add-friend" ? "active" : ""}
      >
        <FaUserPlus />
      </a>
      
      <a
        href="/videos"
        className={location.pathname === "/videos" ? "active" : ""}
      >
        <FaYoutube />
      </a>
      <a
        href="/marketplace"
        className={location.pathname === "/marketplace" ? "active" : ""}
      >
        <FaStore />
      </a>

      <a
        href="/groups"
        className={location.pathname === "/groups" ? "active" : ""}
      >
        <FaUsers />
      </a>
      
    </div>
  );
};

export default MainMenu;