import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function LandingNavBar() {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to={"/"} id="navbar__logo">
          MySTEMGrowth Profile
        </Link>
        <div
          className={`${
            showNav ? "navbar__toggle is-active" : "navbar__toggle"
          }`}
          id="mobile-menu"
          onClick={toggleNav}
        >
          <span className="bar"></span> <span class="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`${showNav ? "navbar__menu active" : "navbar__menu"}`}>
          <li className="navbar__item">
            <Link to={"/login/"} className="navbar__links">
              Login
            </Link>
          </li>
          <li className="navbar__btn">
            <Link className="button" to={"/signup/"}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LandingNavBar;