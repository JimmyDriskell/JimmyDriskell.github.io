import React, { useState } from "react";
import "../styles/home.css";
import "../index.css";
import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Axios from "axios";

const env = process.env;

export default function AdminPasswordReset() {
  const { auth } = useAuth();
  const [email, setEmail] = new useState("");
  const [password, setPassword] = new useState("");
  const [confirmPassword, setConfirmPassword] = new useState("");

  const resetPassword = () => {
    if (password === confirmPassword && password.length >= 7) {
      const url = env.REACT_APP_BACKEND_URL + "users/passwordReset";
      console.log(url);
      Axios.post(url, {
        email: email,
        password: password,
        token: auth.accessToken,
      })
        .then((response) => {
          console.log(response);
          if (response.data.success === 1) {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            document.getElementById("emailInput").value = "";
            document.getElementById("passwordInput").value = "";
            document.getElementById("confirmInput").value = "";
            alert("Password reset successfully");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error trying to reset password. Make sure email is correct.");
        });
    } else {
      if (password !== confirmPassword) alert("Passwords do not match");
      if (password.length < 7) alert("Password too short");
    }
  };

  return (
    <div class="cont">
      <AdminNavBar />

      <div class="content-placeholder-results">
        <h1>Reset User Password</h1>

        <div>
          <label>
            {"Enter Account Email: "}
            <input
              type="email"
              id="emailInput"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            {"Enter New Password (minimum of 7 characters): "}
            <input
              type="password"
              id="passwordInput"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            {"Confirm New Password: "}
            <input
              type="password"
              id="confirmInput"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            style={{ marginTop: "16px" }}
            className="action-button"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
        <Link to="/adminHome">
          <button className="action-button">Return Home</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
