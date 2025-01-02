import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Axios from "axios";

import "../styles/signup.css";
import "../index.css";

const env = process.env;

export default function SignUp() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const [registerStatus, setRegisterStatus] = useState(false);
  const [errorMessage, setErrorMessage] = new useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    setAuth({ email: "", password: "", role: "", accessToken: "" });
  }, []);

  const register = () => {
    if (password.length < 7) {
      setErrorMessage("Password must be 7 characters or more");
      return;
    }
    const url = env.REACT_APP_BACKEND_URL + "users/signup";
    console.log(url);
    Axios.post(url, {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        if (response?.data?.data?.token) {
          const accessToken = response?.data?.data?.token;
          const role = "user";
          setAuth({ email, password, role, accessToken });
          setRegisterStatus(true);
          navigate("/home");
        } else {
          setRegisterStatus(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.message ==
          "ER_DUP_ENTRY: Duplicate entry '" +
            email +
            "' for key 'users.unique_email'"
        ) {
          setErrorMessage("Email already in use");
        } else {
          alert("There was an error signing up");
        }
      });
  };

  const errorCheck = () => {
    setEmailError("");
    setPasswordError("");
    setPassword2Error("");
    setErrorMessage("");

    if ("" === email) {
      setEmailError("Please enter an email");
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    } else if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    } else if (password.length < 7) {
      setPasswordError("Your password must be at least 7 characters long");
      return;
    } else if ("" === password2) {
      setPassword2Error("Please re-enter your password");
      return;
    } else if (password !== password2) {
      setPassword2Error(
        "Your password resubmission did not match your initial password"
      );
      return;
    }
    register();
    return;
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
            <div className="register-card">
              <h2 className="card-title">Create an Account</h2>
              <p>
                Have an account?{" "}
                <Link to="/login" className="link">
                  Login
                </Link>
              </p>
              <div className="input-container">
                <p className="input-title">Email</p>
                <input
                  type="text"
                  className="text-input"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="error-label">{emailError}</p>
              </div>
              <div className="input-container">
                <p className="input-title">Password</p>
                <input
                  type="password"
                  className="text-input"
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="error-label">{passwordError}</label>
              </div>
              <div className="input-container">
                <p className="input-title">Password Re-enter</p>
                <input
                  type="password"
                  className="text-input"
                  placeholder="Re-enter your password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <label className="error-label">{password2Error}</label>
              </div>
              <p>
                By creating an account, you agree to our{" "}
                <Link to="/toa" className="link">
                  Terms of Use
                </Link>
              </p>
              <p className="error-message">{errorMessage}</p>
              <input
                className={"register-button"}
                type="button"
                onClick={errorCheck}
                value={"Register"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
