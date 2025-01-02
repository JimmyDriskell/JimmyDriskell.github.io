import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/footer";
import "../styles/adminResults.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";

const env = process.env;

export default function AdminCreate() {
  const [program_name, setProgramName] = useState("");
  const [message, setMessage] = useState(null); // State to manage messages
  const defaultSurveyName = "IINSPIRE Survey Final";

  const handleProgramChange = (e) => {
    setProgramName(e.target.value);
    console.log(program_name);
  };

  const createNewProgram = () => {
    //const url = 'http://iinspire-server-env-3.eba-mr9iqaem.us-east-2.elasticbeanstalk.com:3000/api/programs';
    const url = env.REACT_APP_BACKEND_URL + "programs";
    Axios.post(url, {
      program_name: program_name,
    })
      .then((response) => {
        // Handle successful response
        setMessage("New program created successfully!");
        console.log("new program name " + program_name);
        //fetchDataRefresh();
        //assignSurveyToProgram();
      })
      .catch((error) => {
        // Handle error
        setMessage(
          "Error creating new program, name already in use. Please enter a new name"
        );
        console.error("Error creating new program:", error);
        alert(
          "Error creating new program, name already in use. Please enter a new name"
        );
      });
  };

  return (
    <div class="cont">
      <AdminNavBar />

      <div class="content-placeholder-results">
        <h1>Create New Program Groups</h1>

        <div>
          <label>
            {"Enter New Program Name: "}
            <input
              type="text"
              value={program_name}
              onChange={handleProgramChange}
            />
          </label>
          <button className="action-button-results" onClick={createNewProgram}>
            Create New Program
          </button>
        </div>
        {message && <p>{message}</p>}

        <Link to="/adminHome">
          <button className="action-button">Return Home</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
