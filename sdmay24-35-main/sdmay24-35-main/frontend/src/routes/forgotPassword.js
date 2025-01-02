import NavBar from "./navbar";
import "../styles/about.css";
import useAuth from "../hooks/useAuth";
import LandingNavbar from "../components/landingNavbar";

export default function ForgotPassword() {
  const { auth } = useAuth();

  return (
    <div>
      <LandingNavbar />
      <div className="main-content">
        <div
          className="main-top"
          style={{ width: "100%", height: "100px", marginBottom: "20px" }}
        >
          <div className="header-about">Forgot Password</div>
        </div>
        <div className="references-container">
          <p>
            Email an administrator, and the administrator can reset your
            password.
          </p>
          <p>
            Make sure to contact the administrator with the email for which the
            password will be reset
          </p>
          <p>
            An administrator to contact is{" "}
            <a href="mailto:saba-ali@uiowa.edu">saba-ali@uiowa.edu</a>
          </p>
        </div>
      </div>
    </div>
  );
}
