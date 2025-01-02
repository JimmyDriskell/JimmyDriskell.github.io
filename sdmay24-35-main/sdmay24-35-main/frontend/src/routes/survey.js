import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import NavBar from "./navbar";
import useAuth from "../hooks/useAuth";

import "../styles/survey.css";

const env = process.env;

//Just creates a checkbox
const Checkbox = ({ label, checked, value, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

const Radio = ({ label, index, value, onChange }) => {
  return (
    <label>
      <div className="survey-bubble-text">{label}</div>

      <div className="survey-bubble-bub">
        <input type="radio" value={value} onChange={onChange} name={index} />
      </div>
    </label>
  );
};

let answerArr = [];
let surveyID = 107;
let survey_name = "IINSPIRE Survey Final";

export default function Survey() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [credits, setCredits] = useState("");
  const [interest, setInterest] = useState("");
  const [institution, setInstitution] = useState("");

  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [raceError, setRaceError] = useState("");
  const [creditsError, setCreditsError] = useState("");
  const [interestError, setInterestError] = useState("");
  const [institutionError, setInstitutionError] = useState("");
  const [programError, setProgramError] = useState("");
  const [questionsError, setQuestionsError] = useState("");

  const [page, setPage] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [surveyPlaceholderSelected, setSurveyPlaceholderSelected] =
    useState(true);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [programPlaceholderSelected, setProgramPlaceholderSelected] =
    useState(true);
  const [attempt_id, setAttemptID] = useState([]);

  //console.log(auth.user_id);

  useEffect(() => {
    //Getting the questions for the survey
    let url = env.REACT_APP_BACKEND_URL + "questions/getAllQuestionText";
    console.log(url);
    Axios.get(url, {
      params: { survey_name: survey_name },
    })
      .then((res) => {
        setQuestions(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    url = env.REACT_APP_BACKEND_URL + "surveys/getAssignedSurvey";
    console.log(url);
    Axios.get(url, {
      params: { token: auth.accessToken },
    })
      .then((res) => {
        setSurveys(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    url = env.REACT_APP_BACKEND_URL + "programs";
    console.log(url);
    Axios.get(url, {})
      .then((res) => {
        setPrograms(res.data.results);
        console.log("data: ", res.data.results);
      })
      .catch((err) => console.log(err));

    url = env.REACT_APP_BACKEND_URL + "responses/attemptID";
    console.log(url);
    Axios.get(url, {
      params: { survey_id: surveyID, token: auth.accessToken },
    })
      .then((res) => {
        setAttemptID(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateUser = () => {
    //const url = 'http://localhost:3000/api/users/update_user'
    console.log("Token: " + auth.accessToken);
    const url = env.REACT_APP_BACKEND_URL + "users/update_user";
    console.log(url);
    Axios.post(url, {
      email: auth.email,
      age: age,
      gender: gender,
      ethnicity: race,
      credits: credits,
      stem_interest: interest,
      institution: institution,
      token: auth.accessToken,
      role: "user",
      program: selectedProgram,
    })
      .then((res) => {
        console.log(res);
        Axios.post(env.REACT_APP_BACKEND_URL + "users/login", {
          email: auth.email,
          password: auth.password,
        })
          .then((response) => {
            console.log(response);
            if (response.data.data.token) {
              const accessToken = response?.data?.data?.token;
              const role = response?.data?.data?.role;
              const email = auth.email;
              const password = auth.password;
              setAuth({ email, password, role, accessToken });
            }
          })
          .catch((error) => {
            alert("There was an error");
          });
      })
      .catch((err) => console.log(err));
  };

  const login = () => {
    const url = env.REACT_APP_BACKEND_URL + 'users/login'
    console.log(url);
    console.log(auth.accessToken);
    Axios.post(url, {
    email: auth.email,
    password: auth.password,
  }).then((response) => {
      console.log(response);
      if (response.data.data.token){
          auth.accessToken = response?.data?.data?.token;
          console.log(auth.accessToken);
      }
  })
  }

  /*
  const getAttemptID = () => {
    const url = env.REACT_APP_BACKEND_URL + 'responses/attemptID';
    console.log(url);
    console.log(selectedSurvey);
    Axios.get(url, {
      params: {"survey_id": selectedSurvey, "token": auth.accessToken}
    }).then((res) => {
      setAttemptID(res.data.data);
      console.log(res.data.data);
    }).catch((err) => 
      console.log(err));
  };*/

  const postQuestions = (a, b, c) => {
    console.log("Token: " + auth.accessToken);
    const url = env.REACT_APP_BACKEND_URL + "responses/createResponses";
    Axios.post(url, {
      survey_id: 107,
      token: auth.accessToken,
      question_id: a,
      response_value: b,
      question_group: c,
      attempt_id: attempt_id + 1,
      program: selectedProgram,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    return 1;
  };

  const displayBubbles = (index, arr, length, type) => {
    let content = [];
    let showArr = arr;
    //console.log(index);
    if (type === "D/A - 0-5") {
      showArr = ["Disagree", "", "", "", "", "Agree"];
    } else if (type === "N/A - 0-6") {
      showArr = ["Never", "", "", "", "", "", "Always"];
    } else if (type === "SD/SL - 0-4") {
      showArr = ["Dislike", "", "", "", "Like"];
    } else if (type === "NC/CC - 0-9") {
      showArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    } else if (type === "SD/SA - 0-4") {
      showArr = ["Strongly Disagree", "", "", "", "Strongly Agree"];
    }

    for (let i = 0; i < length; i++) {
      content.push(
        <div className="survey-bubble">
          <Radio
            label={showArr[i]}
            index={index + (page - 1) * qpp}
            value={answerArr[index] === arr[i]}
            onChange={() => (answerArr[index] = arr[i])}
          />
        </div>
      );
    }

    if (type === "NC/CC - 0-9") {
      return (
        <>
          <p style={{ fontSize: 12, textAlign: "center", marginRight: "3%" }}>
            No Confidence
          </p>
          {content}
          <p style={{ fontSize: 12, textAlign: "center" }}>
            Complete Confidence
          </p>
        </>
      );
    } else {
      return content;
    }
  };

  const handleSurveySelectionChange = (e) => {
    setSelectedSurvey(e.target.value);
    console.log(e.target.value);
    console.log(
      "Selected Survey Title:",
      e.target.options[e.target.selectedIndex].text
    );
    //added for disabling button if defaults are selected
    setSurveyPlaceholderSelected(e.target.value === "");
    //getAttemptID();
  };

  const handleProgramSelectionChange = (e) => {
    setSelectedProgram(e.target.value);
    console.log(
      "Selected Program Title:",
      e.target.options[e.target.selectedIndex].text
    );
    //added for disabling button if defaults are selected
    setProgramPlaceholderSelected(e.target.value === "");
  };

  //Displays the questions past the first page
  const qpp = 20; //stands for questions per page
  const getAllQuestions = questions.data?.map(() => {
    return;
  });
  const displayQuestions = questions.data
    ?.slice((page - 1) * qpp, page * qpp)
    ?.map((q, index) => {
      //console.log(q.question_text);
      return (
        <>
          <hr
            style={{
              background: "#BBB",
              height: "2px",
            }}
          />

          <div key={q.question_id}>
            <div className="survey-split-screen">
              <div className="survey-split-left">{q.question_text}</div>
              <div className="survey-split-right">
                {displayBubbles(
                  index + (page - 1) * qpp,
                  JSON.parse(q.options),
                  JSON.parse(q.options).length,
                  q.question_type
                )}
              </div>
            </div>
          </div>
        </>
      );
    });

  //All of this is just the first page where we ask their age, gender, etc.
  function displayFirstPage() {
    return (
      <>
        {" "}
        <h2 className="header2-survey">General Questions</h2>
        <div className="input-container">
          Which program are you in?
          <select onChange={handleProgramSelectionChange}>
            <option value="" disabled={false}>
              Please select a program
            </option>
            {programs.map((p) => (
              <option key={p.program_name} value={p.program_name}>
                {p.program_name}
              </option>
            ))}
          </select>
          <p className="error-label">{programError}</p>
        </div>
        <div className="input-container">
          <p className="input-title">What is your age?</p>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setAge(e.target.value)}
          />
          <p className="error-label">{ageError}</p>
        </div>
        <div className="page-one-checks">
          <p className="input-title">
            Please indicate your gender (select all that apply)
          </p>
          <Checkbox
            label="Woman"
            checked={gender === "Woman"}
            value={gender}
            onChange={() => setGender("Woman")}
          />
          <div></div>
          <Checkbox
            label="Man"
            checked={gender === "Man"}
            value={gender}
            onChange={() => setGender("Man")}
          />
          <div></div>
          <Checkbox
            label="Transgender"
            checked={gender === "Transgender"}
            value={gender}
            onChange={() => setGender("Transgender")}
          />
          <div></div>
          <Checkbox
            label="Non-binary/Non-conforming"
            checked={gender === "Non-binary/Non-conforming"}
            value={gender}
            onChange={() => setGender("Non-binary/Non-conforming")}
          />
          <div></div>
          <Checkbox
            label="Prefer not to respond"
            checked={gender === "Prefer not to respond"}
            value={gender}
            onChange={() => setGender("Prefer not to respond")}
          />
          <p className="error-label">{genderError}</p>
        </div>
        <div className="page-one-checks">
          <p className="input-title">
            Please indicate your race/ethnicity (select all that apply)
          </p>
          <Checkbox
            label="African American"
            checked={race === "African American"}
            value={race}
            onChange={() => setRace("African American")}
          />
        </div>
        <div className="page-one-checks">
          <Checkbox
            label="White"
            checked={race === "White"}
            value={race}
            onChange={() => setRace("White")}
          />
        </div>
        <div className="page-one-checks">
          <Checkbox
            label="Hispanic/Latino(a)"
            checked={race === "Hispanic/Latino(a)"}
            value={race}
            onChange={() => setRace("Hispanic/Latino(a)")}
          />
        </div>
        <div className="page-one-checks">
          <Checkbox
            label="Asian"
            checked={race === "Asian"}
            value={race}
            onChange={() => setRace("Asian")}
          />
        </div>
        <div className="page-one-checks">
          <Checkbox
            label="American Indian/Alaska Native"
            checked={race === "American Indian/Alaska Native"}
            value={race}
            onChange={() => setRace("American Indian/Alaska Native")}
          />
        </div>
        <div className="page-one-checks">
          <Checkbox
            label="Native Hawaiian/Other Pacific Islander"
            checked={race === "Native Hawaiian/Other Pacific Islander"}
            value={race}
            onChange={() => setRace("Native Hawaiian/Other Pacific Islander")}
          />
        </div>
        <div className="page-one-checks">
          <Checkbox
            label="Prefer not to respond"
            checked={race === "Prefer not to respond"}
            value={race}
            onChange={() => setRace("Prefer not to respond")}
          />
          <p className="error-label">{raceError}</p>
        </div>
        <div className="input-container">
          <p className="input-title">
            How many higher education credits have you taken?
          </p>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setCredits(e.target.value)}
          />
          <p className="error-label">{creditsError}</p>
        </div>
        <div className="input-container">
          <p className="input-title">What is your STEM area of interest?</p>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setInterest(e.target.value)}
          />
          <p className="error-label">{interestError}</p>
        </div>
        <div className="input-container">
          <p className="input-title">
            Which institution of higher education are you attending (or planning
            on attending)?
          </p>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setInstitution(e.target.value)}
          />
          <p className="error-label">{institutionError}</p>
        </div>
      </>
    );
  }

  function displayNextPages() {
    //console.log(questions.data.question_text);
    return (
      <div>
        <h2 className="header2-survey">
          Please indicate the level to which you agree or disagree with each
          statement
        </h2>
        <div className="space"></div>
        {displayQuestions}
        <p className="error-label">{questionsError}</p>
      </div>
    );
  }

  function display() {
    if (page === 0) {
      return displayFirstPage();
    } else if (page * qpp > getAllQuestions.length + qpp) {
      const postAllQuestions = questions.data?.map((q, index) => {
        return (
          <>
            {postQuestions(q.question_id, answerArr[index], q.question_group)};
          </>
        );
      });
      navigate("/profile");
    } else {
      return displayNextPages();
    }
  }

  //Takes you to the next page
  const next = () => {
    if (page === 0) {
      updateUser();
    }
    setPage(page + 1);
    return;
  };

  //Takes you to the previous page (if there is one)
  const previous = () => {
    if (page > 0) {
      setPage(page - 1);
    }
    return;
  };

  //Checks for errors in inputs
  const errorCheck = () => {
    setProgramError("");
    setAgeError("");
    setGenderError("");
    setRaceError("");
    setCreditsError("");
    setInterestError("");
    setInstitutionError("");
    setQuestionsError("");

    if (page === 0) {
      if ("" === selectedProgram) {
        setProgramError("Please select a program");
        return;
      }
      if ("" === age) {
        setAgeError("Please enter your age");
        return;
      } else if ("" === gender) {
        setGenderError("Please enter your gender");
        return;
      } else if ("" === race) {
        setRaceError("Please enter your race");
        return;
      } else if ("" === credits) {
        setCreditsError("Please enter your credits");
        return;
      } else if ("" === interest) {
        setInterestError("Please enter your area of interest");
        return;
      } else if ("" === institution) {
        setInstitutionError("Please enter your desired institution");
        return;
      }
    } else {
      console.log(page * qpp - 1);
      for (
        let i = (page - 1) * qpp;
        i < page * qpp && i < getAllQuestions.length;
        i++
      ) {
        if (typeof answerArr[i] === "undefined") {
          console.log("Question ", i, " was not answered");
          setQuestionsError("Not all questions on this page are answered");
          return;
        }
      }
    }
    next();
    return;
  };

  function buttons() {
    if (page === 0) {
      return (
        <>
          <button className="next-button" onClick={errorCheck}>
            Next
          </button>
        </>
      );
    } else if (page * qpp > getAllQuestions.length) {
      return (
        <>
          <button className="next-button" onClick={errorCheck}>
            Finish Survey
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="next-button" onClick={errorCheck}>
            Next
          </button>
        </>
      );
    }
  }

  return (
    <>
      <NavBar />
      <div className="survey-page">
        <div className="survey-card">
          <h1 className="header-survey">Survey</h1>
          {display()}
          {buttons()}
        </div>
      </div>
    </>
  );
}