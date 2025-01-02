import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/footer";
import Axios from "axios";
// import "../styles/adminHome.css" ;
import "../styles/adminResults.css";

const env = process.env;
export default function AdminResults() {
  const [email, setEmail] = useState("");
  const [programs, setPrograms] = useState([]); // State to hold fetched programs
  const [selectedProgram, setSelectedProgram] = useState("");
  const [programPlaceholderSelected, setProgramPlaceholderSelected] =
    useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleProgramSelectionChange = (e) => {
    setSelectedProgram(e.target.value);
    console.log(
      "Selected Program Name:",
      e.target.options[e.target.selectedIndex].text
    );
    //added for disabling button if defaults are selected
    setProgramPlaceholderSelected(e.target.value === "");
  };

  const handleByEmailSubmit = () => {
    // const url = 'http://iinspire-server-env-3.eba-mr9iqaem.us-east-2.elasticbeanstalk.com:3000/api/exports/userEmailCSV';
    const url = env.REACT_APP_BACKEND_URL + "exports/userEmailCSV";
    console.log("requesting results for email: " + email);
    Axios.get(url, {
      params: { email: email },
      responseType: "text", // Set response type to text
    })
      .then((response) => {
        // Handle successful response
        console.log("Survey results:", response);
        console.log("User email: ", email);
        const csvData = response.data; // Assign the response data to csvData
        downloadEmailCSV(csvData); // Trigger download of CSV file
      })
      .catch((error) => {
        //Handle error
        console.error("Error fetching survey results:", error);
        alert("Error fetching survey results by email");
      });
  };

  const handleByProgramNameSubmit = () => {
    //const url = 'http://iinspire-server-env-3.eba-mr9iqaem.us-east-2.elasticbeanstalk.com:3000/api/exports/avgByProgramName';
    const url = env.REACT_APP_BACKEND_URL + "exports/avgByProgramName";
    console.log(selectedProgram);
    Axios.get(url, {
      params: { program_name: selectedProgram }, //used to be surveyName
      responseType: "text", // Set response type to text
    })
      .then((response) => {
        // Handle successful response
        console.log("Survey results:", response);
        console.log("Program name: ", selectedProgram); //used to be surveyName
        const csvData = response.data; // Assign the response data to csvData
        downloadCSV(csvData); // Trigger download of CSV file
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching survey results:", error);
        alert("Error fetching survey results by program name");
      });
  };

  const downloadCSV = (data) => {
    const csvContent = "data:text/csv;charset=utf-8," + data;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      "survey_results_for_" + selectedProgram + ".csv"
    );
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  const downloadEmailCSV = (data) => {
    const csvContent = "data:text/csv;charset=utf-8," + data;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "survey_results_by_email_" + email + ".csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const programReply = await Axios.get('http://iinspire-server-env-3.eba-mr9iqaem.us-east-2.elasticbeanstalk.com:3000/api/programs');
        const programReply = await Axios.get(
          env.REACT_APP_BACKEND_URL + "programs"
        );
        console.log("Fetched Data:", programReply.data); // Log the raw data
        setPrograms(programReply.data.results);
        console.log("programs contains :" + programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
        alert("Error fetching programs.");
      }
    };
    fetchData();
  }, []);

  return (
    <div class="cont">
      <AdminNavBar />

      <div class="content-placeholder-results">
        <h1>Admin Results</h1>
        <div>
          <label>
            {"Enter Student Email: "}
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <button
            className="action-button-results"
            onClick={handleByEmailSubmit}
          >
            Retrieve by Email
          </button>
        </div>
        <div>
          <label>
            {"Select a Program: "}
            <select onChange={handleProgramSelectionChange}>
              <option value="" disabled={false}>
                Please select a program name
              </option>
              {programs.map((program) => (
                <option key={program.program_name} value={program.program_name}>
                  {program.program_name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="action-button-results"
            disabled={programPlaceholderSelected}
            onClick={handleByProgramNameSubmit}
          >
            Retrieve by Program Name
          </button>
        </div>
        <p>
          Please allow a few seconds for the download to start after clicking
          the button. If the download still does not start, please ensure that
          you have correctly entered the email or selected a program name.
        </p>
        <Link to="/adminHome">
          <button className="action-button">Return Home</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
