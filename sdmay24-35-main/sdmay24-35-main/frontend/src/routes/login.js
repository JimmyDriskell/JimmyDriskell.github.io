import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Axios from "axios";

import "../styles/login.css";

const env = process.env;

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = new useState("");
  const [password, setPassword] = new useState("");
  const [errorMessage, setErrorMessage] = new useState("");

  useEffect(() => {
    setAuth({ email: "", password: "", role: "", accessToken: "" });
  }, []);

  const login = () => {
    setErrorMessage("");
    const url = env.REACT_APP_BACKEND_URL + "users/login";
    console.log(url);
    Axios.post(url, {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.data.token) {
          const accessToken = response?.data?.data?.token;
          const role = response?.data?.data?.role;
          setAuth({ email, password, role, accessToken });
          setEmail("");
          setPassword("");
          if (role === "admin") {
            navigate("/adminHome");
          } else {
            navigate("/home");
          }
        }
      })
      .catch((error) => {
        if (error.response.data.message === "Email or password incorrect.") {
          console.log(error);
          setErrorMessage("Incorrect email or password");
        } else {
          alert("An error has occurred while trying to log in");
        }
      });
  };

  return (
    <div>
      <div className="split-screen">
        <div className="split-left">
          <div className="gradient-background">
            <div className="logo-container">
              <h1 className="title">MySTEMGrowth Profile</h1>
            </div>
          </div>
        </div>
        <div className="split-right">
          <div className="right-content">
            <div className="login-card">
              <h2 className="header">Login to your account</h2>
              <p>
                New here?{" "}
                <Link className="link" to={`/signup`}>
                  SignUp
                </Link>
              </p>
              <div className="input-container">
                <p className="input-title">Email</p>
                <input
                  type="text"
                  className="text-input"
                  placeholder="Enter Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-container">
                <p className="input-title">Enter Password</p>
                <input
                  type="password"
                  className="text-input"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="recovery-container">
                <Link className="recovery" to={`/forgotPassword`}>
                  Forgot password?
                </Link>
              </div>
              <p>
                By creating account, you agree to our{" "}
                <Link className="link" to={`/toa`}>
                  Terms of Use
                </Link>
              </p>
              <p className="error-message">{errorMessage}</p>
              <button className="login-button" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
