import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/footer";
import "../styles/adminHome.css";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div>
      <AdminNavBar />
      <main>
        <section className="intro">
          <h2>Welcome to MySTEMGrowth Admin Profile!</h2>
        </section>
        <section className="tool-description">
          <p>
            This tool will help students to understand their beliefs about their
            STEM abilities. This inventory will capture a snapshot that will
            generate a profile that students can use to recognize their STEM
            growth potential.
          </p>
        </section>
        <section className="adminInfo">
          <h4>
            Access the following pages to view student's results, create new
            programs, or make changes to the survey questions!
          </h4>
        </section>
      </main>
      <div className="container">
        <div>
          <div>
            <div className="content-placeholder">
              {/* <img src={tempGraphs} alt="survey results" className='content-image'/> */}
              <Link to="/adminResults">
                <button className="action-button">View Student Results</button>
              </Link>
              {/* <img src={tempGraphs} alt="survey results" className='content-image'/> */}
              <Link to="/adminCreate">
                <button className="action-button">Create New Program</button>
              </Link>
              <Link to="/adminSurvey">
                <button className="action-button">Edit A Survey</button>
              </Link>
              <Link to="/adminAssign">
                <button className="action-button">Assign Admin</button>
              </Link>
              <Link to="/adminPasswordReset">
                <button className="action-button">Reset a Password</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
