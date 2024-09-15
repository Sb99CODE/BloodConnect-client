import React from "react";
import {MdOutlineBloodtype} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineBarChart } from 'react-icons/ai';
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ">
          <div className="navbar-brand h1 ">
            <MdOutlineBloodtype color="red" /> BloodConnect
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
            <p className="nav-link">
               <FaUser /> Welcome,{" "}
                 {user?.name || user?.hospitalName || user?.organisationName} !
                  &nbsp;
                <span className="badge bg-secondary">
                 {user?.role && user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </p>

            </li>
            {location.pathname === "/" ||
      location.pathname === "/d" ||
      location.pathname === "/hospital" ? (
        <li className="nav-item mx-3">
          <Link to="/analytics" className="nav-link custom-nav-link">
            <AiOutlineBarChart className="me-1" /> Analytics
          </Link>
        </li>
      ) : (
        <li className="nav-item mx-3">
          <Link to="/" className="nav-link custom-nav-link">
            <AiOutlineHome className="me-1" /> Home
          </Link>
        </li>
      )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
