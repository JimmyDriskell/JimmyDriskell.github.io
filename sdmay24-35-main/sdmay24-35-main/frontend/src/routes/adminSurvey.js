import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/footer";
import "../styles/adminEditQuestions.css";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Axios from "axios";

const env = process.env;

export default function AdminSurvey() {
  const [questions, setQuestions] = useState([]);
  const [editedQuestions, setEditedQuestions] = useState([]);
  const [surveys, setSurveys] = useState([]); // State to hold fetched surveys
  const [selectedSurvey, setSelectedSurvey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await Axios.get('http://iinspire-server-env-3.eba-mr9iqaem.us-east-2.elasticbeanstalk.com:3000/api/surveys/getAllSurveys');
        const response = await Axios.get(
          env.REACT_APP_BACKEND_URL + "surveys/getAllSurveys"
        );
        console.log("Fetched Data:", response.data); // Log the raw data
        setSurveys(response.data.data); // This is now set directly to the surveys variable
      } catch (error) {
        console.error("Error fetching surveys:", error);
        alert("Error fetching surveys");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("survey:" + selectedSurvey + "has been selected");
    if (selectedSurvey) {
      // const url ='http://iinspire-server-env-3.eba-mr9iqaem.us-east-2.elasticbeanstalk.com:3000/api/questions/getAllQuestionText'
      const url = env.REACT_APP_BACKEND_URL + "questions/getAllQuestionText";
      Axios.get(url, {
        params: { survey_name: selectedSurvey },
      })
        .then((res) => {
          const resData = res.data;
          console.log("Response data:", resData.data);
          const questionsData = resData.data.map((question) => ({
            question_id: question.question_id,
            question_text: question.question_text,
          }));
          setQuestions(questionsData);
          setEditedQuestions(questionsData.slice()); // Copy initial questions to editedQuestions
        })
        .catch((err) => {
          console.log(err);
          alert("Error fetching survey questions");
        });
    }
  }, [selectedSurvey]);

  const handleQuestionChange = (index, newQuestionText) => {
    setEditedQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].question_text = newQuestionText;
      return updatedQuestions;
    });
  };

  const saveChanges = (questionId, questionText) => {
    //  const url ='http://iinspire-server-env-3.eba-mr9iqaem.us-east-2.elasticbeanstalk.com:3000/api/questions/update_question'
    const url = env.REACT_APP_BACKEND_URL + "questions/update_question";
    Axios.post(url, [
      {
        question_text: questionText,
        question_id: questionId,
      },
    ])

      .then((res) => {
        console.log(questionText);
        console.log(questionId);
        console.log("Questions updated successfully:", res.data);
      })
      .catch((err) => {
        console.log("Error updating questions:", err);
        alert("Error saving question changes");
      });
  };

  const handleSurveySelectionChange = (e) => {
    setSelectedSurvey(e.target.value);
    console.log(
      "Selected Survey Title:",
      e.target.options[e.target.selectedIndex].text
    );
  };

  return (
    <div className="admin-survey-container">
      <AdminNavBar />
      <div style={{ marginTop: "20px" }}>
        <label>
          {"Select a Survey to Edit: "}
          <select onChange={handleSurveySelectionChange}>
            <option value="" disabled={false}>
              Please select a survey name
            </option>
            {surveys.map((survey) => (
              <option key={survey.survey_name} value={survey.survey_name}>
                {survey.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="survey-questions">
        <div>
          <h1>Edit Survey Questions</h1>
          {questions.map((question, index) => (
            <div key={index}>
              <textarea
                value={editedQuestions[index].question_text}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                rows={1}
              />
              <button
                className="action-button"
                onClick={() =>
                  saveChanges(
                    question.question_id,
                    editedQuestions[index].question_text
                  )
                }
              >
                Save Changes
              </button>
            </div>
          ))}
        </div>
        <Link to="/adminHome">
          <button className="action-button">Return Home</button>
        </Link>
      </div>
      <Footer className="footer" />
    </div>
  );
}
