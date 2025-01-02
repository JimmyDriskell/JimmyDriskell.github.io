import React, { useEffect } from "react";
import "../styles/landing.css";
import "../index.css";
import LandingNavbar from "../components/landingNavbar";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth({ email: "", password: "", role: "", accessToken: "" });
  }, []);

  return (
    <>
      <LandingNavbar />
      <div className="main-container">
        <h1 className="home-title">MySTEMGrowth Profile</h1>
        <p className="home-body-text">
          When you’re in the thick of your studies, sometimes it can be
          challenging to appreciate where you are in your STEM journey.
          MySTEMGrowth Profile will allow you to step back and see where you are
          along your path. Our surveys explore your personal beliefs about your
          capabilities and how those might help your community. Take the
          surveys, explore your results, and celebrate your unique path in the
          world of science, technology, engineering, and mathematics.
        </p>
      </div>
    </>
  );
}
