import NavBar from "./navbar";
import "../styles/about.css";
import useAuth from "../hooks/useAuth";
import LandingNavbar from "../components/landingNavbar";

export default function TermsOfUse() {
  const { auth } = useAuth();

  return (
    <div>
      {auth.role ? <NavBar /> : <LandingNavbar />}
      <div className="main-content">
        <div
          className="main-top"
          style={{ width: "100%", height: "100px", marginBottom: "20px" }}
        >
          <div className="header-about">Terms Of Use</div>
        </div>
        <div className="references-container">
          <h2>Terms of Use for MySTEMGrowth Profile</h2>
          <h3>Introduction</h3>
          <p>
            Welcome to MySTEMGrowth Profile. This Terms of Use ("Agreement")
            governs your use of our survey tool designed to assess and support
            your growth potential within the fields of Science, Technology,
            Engineering, and Mathematics (STEM). By accessing or using our
            survey tool, you agree to be bound by the terms and conditions
            outlined in this Agreement.
          </p>
          <h3>1. Data Compilation and Presentation</h3>
          <p>
            1.1 Our tool collects responses to various survey questions related
            to your interests, abilities, and aspirations in STEM fields. The
            primary purpose of this data collection is to compile and analyze
            your responses to provide you with personalized insights and
            recommendations aimed at fostering your development in STEM.
          </p>
          <p>
            1.2 The results presented to you will include comparative analytic
            profiles and potential growth areas.
          </p>
          <h3>2. Use of Data for Program Evaluation</h3>
          <p>
            2.1 In addition to providing you with personalized feedback, the
            data collected through this survey may be used for program
            evaluation purposes. This involves analyzing aggregated data to
            assess and improve the effectiveness of student programs designed to
            facilitate STEM career development.
          </p>
          <p>
            2.2 Your individual responses will be confidential and only used in
            aggregate form for program evaluation purposes. No personally
            identifiable information will be disclosed in any reports or
            publications resulting from this evaluation unless consent is
            explicitly given.
          </p>
          <h3>3. Consent to Use Data</h3>
          <p>
            3.1 By participating in this survey, you consent to the collection,
            analysis, and use of your data as described in sections 1 and 2 of
            this Agreement.
          </p>
          <p>
            3.2 You have the right to withdraw your consent at any time.
            However, please note that withdrawing consent after your data has
            been aggregated for program evaluation purposes may not result in
            the removal of your data from the aggregated dataset.
          </p>
          <h3>4. Data Security and Privacy</h3>
          <p>
            4.1 We are committed to protecting your privacy and ensuring the
            security of your personal information. Appropriate measures will be
            taken to safeguard your data against unauthorized access,
            disclosure, alteration, or destruction.
          </p>
          <h3>5. Changes to the Agreement</h3>
          <p>
            5.1 We reserve the right to make changes to this Agreement at any
            time. You will be notified of any significant changes, and your
            continued use of the survey tool after such changes will constitute
            your acceptance of the new terms.
          </p>
          <h3>6. Contact Information</h3>
          <p>
            For any questions or concerns regarding this Agreement or your data,
            please contact us at{" "}
            <a href="mailto:saba-ali@uiowa.edu">saba-ali@uiowa.edu</a>.
          </p>
          <h3>7. Agreement</h3>
          <p>
            By using the STEM Survey Tool, you acknowledge that you have read,
            understood, and agree to be bound by this Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
}
