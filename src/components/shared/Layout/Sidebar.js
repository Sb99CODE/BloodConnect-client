import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHandHoldingHeart } from "react-icons/fa"; // Donation icon
import { FaBuilding } from "react-icons/fa"; // Organisation icon
import "../../../styles/Layout.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {(user?.role === "donor" || user?.role === "hospital") && (
            <div className={`menu-item ${location.pathname === "/organisation" && "active"}`}>
              <FaBuilding className="menu-icon white-icon" />
              <Link to="/organisation">Organisation</Link>
            </div>
          )}

          {user?.role === "donor" && (
            <div className={`menu-item ${location.pathname === "/donation" && "active"}`}>
              <FaHandHoldingHeart className="menu-icon white-icon" /> {/* White icon for donation */}
              <Link to="/donation">Donation</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


