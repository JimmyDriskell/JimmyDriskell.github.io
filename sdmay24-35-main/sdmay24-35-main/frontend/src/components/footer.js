// src/Footer.js
import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>
          MySTEMGrowth Profile | <Link to="/toa">Terms of Use</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
