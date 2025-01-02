import React from "react";
import "../styles/home.css";
import "../index.css";
import NavBar from "./navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const profile = require("../images/profile.png");
const survey = require("../images/survey.png");

export default function Landing() {
  return (
    <>
      <NavBar />
      <main>
        <section className="intro">
          <h2>Welcome to MySTEMGrowth Profile!</h2>
        </section>
        <section className="tool-description">
          <p>
            Answering the following questions will help you to understand your
            beliefs about your STEM abilities. This inventory will capture a
            snapshot that will generate a profile that you can use to recognize
            your STEM growth potential.
          </p>
        </section>
      </main>
      <div className="container-home">
        <div>
          <div>
            <div className="content-placeholder">
              <img
                src={survey}
                alt="survey results"
                className="content-image"
              />
              <div className="content-text">
                <Link to="/survey">
                  <button className="action-button">Take Survey!</button>
                </Link>
              </div>
            </div>
            <div className="content-placeholder">
              <div className="content-text">
                <Link to="/profile">
                  <button className="action-button">View Profile!</button>
                </Link>
              </div>
              <img
                src={profile}
                alt="survey results"
                className="content-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </>
  );
}
