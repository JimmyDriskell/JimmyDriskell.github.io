import React, { useState } from "react";
import "../styles/home.css";
import "../index.css";
import Footer from "../components/footer";
import AdminNavBar from "../components/AdminNavBar";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Axios from "axios";

const env = process.env;

export default function AdminAssign() {
  const { auth } = useAuth();
  const [email, setEmail] = new useState("");

  const resetPassword = () => {
    if (email) {
      const url = env.REACT_APP_BACKEND_URL + "users/makeAdmin";
      console.log(url);
      Axios.post(url, {
        email: email,
        token: auth.accessToken,
      })
        .then((response) => {
          console.log(response);
          if (response.data.success === 1) {
            setEmail("");
            document.getElementById("emailInput").value = "";
            alert("User updated successfully");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error trying to reset password. Make sure email is correct.");
        });
    } else {
      alert("Enter an email");
    }
  };

  return (
    <div class="cont">
      <AdminNavBar />

      <div class="content-placeholder-results">
        <h1>Assign Admin</h1>
        <div>
          <label>
            {"Enter Account Email: "}
            <input
              type="email"
              id="emailInput"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            style={{ marginTop: "16px" }}
            className="action-button"
            onClick={resetPassword}
          >
            Assign Admin
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
