import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import anychart from "anychart";
import NavBar from "./navbar";
import "../styles/results.css";
import Axios from "axios";
import Card from "../components/Card";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { drawBubbleChart, drawBarChart } from "../functions/graph";

const env = process.env;

anychart.licenseKey("lsamp-iinspire-8c03f4be-8ef79ff2");

export default function Results() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [chartType, setChartType] = new useState("bubble");
  const [dataSet, setDataSet] = new useState(null);
  const [currentData, setCurrentData] = new useState(null);
  const [compData, setCompData] = new useState(null);
  const [compDataIndex, setCompDataIndex] = new useState("-1");
  const [cardText1, setCardText1] = new useState("loading");
  const [cardText2, setCardText2] = new useState("loading");
  const [cardText3, setCardText3] = new useState("loading");
  const [cardText4, setCardText4] = new useState("loading");
  const [cardText5, setCardText5] = new useState("loading");
  const [cardText6, setCardText6] = new useState("loading");
  const [compOptions, setCompOptions] = new useState([]);
  const [dataOptions, setDataOptions] = new useState([]);

  var chart = null;

  useEffect(() => {
    const url = env.REACT_APP_BACKEND_URL + "responses/getAvgByUserID";
    console.log(url);

    Axios.get(url, {
      headers: { Authorization: auth?.accessToken },
    })
      .then((response) => {
        console.log(JSON.stringify(response));
        const myData = response.data.data;
        //console.log(myData[0].submission_date);
        if (response.data.data.length > 0) {
          setDataSet(myData);
          setCurrentData(myData[myData.length - 1]);
          setCompDataIndex(myData.length - 1);
          drawBubbleChart(chart, myData[myData.length - 1], null, "container");
          setCardText1(
            `Your civic engagement scale circle is ${
              myData[myData.length - 1].groupAverages.group_1_average > 5.5
                ? "larger, it is really important to you to use you career to better your community, you might be motivated by how your career will help others in your community"
                : "smaller you may not know how to get involved to help your community, but through programs like LSAMP you will learn how to get involved and better your community"
            }`
          );
          setCardText2(
            `Your STEM interest circle is ${
              myData[myData.length - 1].groupAverages.group_2_average > 5.5
                ? "larger, you indicated you liked different tasks associated with STEM. Since your circle is larger, it sounds like your interest is already high in there different STEM areas."
                : "smaller, you indicated you dislike different tasks associated with STEM. Don't worry if your circle is smaller, there is plenty of time to grow your interest in college."
            }`
          );
          setCardText3(
            `Your STEM self efficacy circle is on the ${
              myData[myData.length - 1].groupAverages.group_3_average > 5.5
                ? "larger size you feel very good about your ability to perform well on STEM related tasks."
                : "smaller size it is easy to grow this confidence by engaging in STEM related tasks/opportunities."
            }`
          );
          setCardText4(
            `Your STEM outcome expectations circle is ${
              myData[myData.length - 1].groupAverages.group_4_average > 5.5
                ? "larger you probably believe that participation in STEM activities will help you in pursuing a STEM career."
                : "smaller you might not know yet how these STEM activities may benefit your future career, however, through experience in college your circle will likely grow as you gain more understanding and confidence in STEM activities."
            }`
          );
          setCardText5(
            `Your research outcome expectations circle is ${
              myData[myData.length - 1].groupAverages.group_5_average > 5.5
                ? "larger you probably believe that participation in research related tasks will help you in pursuing you STEM major."
                : "smaller you might not know yet how these research related tasks may benefit your STEM major, however, by participating in research experiences such as labs/other activities your circle will likely grow as you gain more understanding and confidence in research related tasks."
            }`
          );
          setCardText6(
            `Your research self efficacy circle is on the ${
              myData[myData.length - 1].groupAverages.group_6_average > 5.5
                ? "larger size you feel very good about your ability to perform well on research related tasks."
                : "smaller it is easy to grow this confidence by engaging in research related tasks/opportunities."
            }`
          );

          let dataCount = myData.length;
          let compDataOptions = [];
          while (dataCount > 0) {
            const date = response.data.data[dataCount - 1].submission_date;
            compDataOptions.push(date);
            dataCount--;
          }
          setCompOptions(compDataOptions);
          setDataOptions(compDataOptions);
          document.getElementById("loading").style.display = "None";
        } else {
          document.getElementById("noData").style.display = "flex";
          document.getElementById("loading").style.display = "None";
        }
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error retrieving the data");
      });
  }, []);

  const getPngBase64String = async () => {
    document.getElementById("container-hidden").hidden = false;

    // Draw bubble chart
    const c = drawBubbleChart(chart, currentData, compData, "container-hidden");

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Calculate center position
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth(`Name: ${"Test"}`) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const centerX = (pageWidth - textWidth) / 2;

    // Set the content of the PDF
    doc.text(`Student Email: ${auth.email}`, 10, 10);
    doc.text("Key:", 10, 17);

    // Set fill color for the rectangle
    doc.setFillColor("#bf5fff");
    doc.roundedRect(10, 20, 55, 30, 5, 5, "F");

    doc.setFillColor("#4a86e8");
    doc.roundedRect(10, 65, 55, 30, 5, 5, "F");

    doc.setFillColor("#ff0000");
    doc.roundedRect(78, 20, 55, 40, 5, 5, "F");

    doc.setFillColor("#ff9900");
    doc.roundedRect(78, 65, 55, 30, 5, 5, "F");

    doc.setFillColor("#93c47d");
    doc.roundedRect(146, 20, 55, 30, 5, 5, "F");

    doc.setFillColor("#fff16e");
    doc.roundedRect(146, 65, 55, 30, 5, 5, "F");

    // Define text content
    const descriptions = [
      "Civic engagement scale tells you how important helping your community is to you.",
      "STEM interest is the degree to which you indicated your like or dislike of certain activities associated with STEM careers.",
      "STEM self efficacy is your beliefs in your ability to do well in a particular task. Self efficacy is task specific, for example you can feel very good about your ability to take a math test but not so good about your ability to hit a homerun or vise versa.",
      "STEM outcome expectations are the beliefs you hold about how your participation in STEM activities will benefit you in the future.",
      "Research outcome expectations are the beliefs you hold about how your participation in research related tasks will benefit you in the future.",
      "Research self efficacy is your beliefs in your ability to do well in research related tasks. Like with STEM self efficacy, research self efficacy is also task specific.",
    ];

    doc.setFontSize(10);
    doc.setFont("helvetica");

    const textWidth1 = 45;
    doc.text(doc.splitTextToSize(descriptions[0], textWidth1), 15, 32);

    doc.text(doc.splitTextToSize(descriptions[1], textWidth1), 15, 73);

    doc.text(doc.splitTextToSize(descriptions[2], textWidth1), 83, 25);

    doc.text(doc.splitTextToSize(descriptions[3], textWidth1), 83, 73);

    doc.text(doc.splitTextToSize(descriptions[4], textWidth1), 151, 26);

    doc.text(doc.splitTextToSize(descriptions[5], textWidth1), 151, 71);

    // Create a promise to get the PNG as base64 string
    const chartImagePromise = new Promise((resolve, reject) => {
      c.getPngBase64String((response) => {
        resolve(response);
      });
    });

    // Wait for the chart image promise to resolve
    const chartImageBase64 = await chartImagePromise;

    // Embed the chart image in the PDF
    doc.addImage(chartImageBase64, "PNG", 10, 110, 180, 100);

    // Add a new page
    doc.addPage();

    // Set fill color for the rectangle
    doc.setFillColor("#bf5fff");
    doc.roundedRect(10, 20, 55, 30, 5, 5, "F");

    doc.setFillColor("#4a86e8");
    doc.roundedRect(145, 65, 55, 30, 5, 5, "F");

    doc.setFillColor("#ff0000");
    doc.roundedRect(10, 110, 55, 30, 5, 5, "F");

    doc.setFillColor("#ff9900");
    doc.roundedRect(145, 155, 55, 30, 5, 5, "F");

    doc.setFillColor("#93c47d");
    doc.roundedRect(10, 200, 55, 30, 5, 5, "F");

    doc.setFillColor("#fff16e");
    doc.roundedRect(145, 245, 55, 30, 5, 5, "F");

    const titles = [
      "          Civic\n    Engagement\n       Behaviors",
      "  STEM Interests",
      "      STEM Self\n        Efficacy",
      "  STEM Outcome\n    Expectations",
      "       Research\n       Outcome\n    Expectations",
      "   Research Self\n        Efficacy",
    ];

    doc.setFontSize(16);

    doc.text(doc.splitTextToSize(titles[0], textWidth1), 15, 30);

    doc.text(doc.splitTextToSize(titles[1], textWidth1), 150, 82);

    doc.text(doc.splitTextToSize(titles[2], textWidth1), 15, 123);

    doc.text(doc.splitTextToSize(titles[3], textWidth1), 150, 168);

    doc.text(doc.splitTextToSize(titles[4], textWidth1), 15, 210);

    doc.text(doc.splitTextToSize(titles[5], textWidth1), 150, 258);

    const feedback = [
      `Your civic engagement scale circle is ${
        currentData.groupAverages.group_1_average > 5.5
          ? "larger, it is really important to you to use you career to better your community, you might be motivated by how your career will help others in your community"
          : "smaller you may not know how to get involved to help your community, but through programs like LSAMP you will learn how to get involved and better your community"
      }`,
      `Your STEM interest circle is ${
        currentData.groupAverages.group_2_average > 5.5
          ? "larger, you indicated you liked different tasks associated with STEM. Since your circle is larger, it sounds like your interest is already high in there different STEM areas."
          : "smaller, you indicated you dislike different tasks associated with STEM. Don't worry if your circle is smaller, there is plenty of time to grow your interest in college."
      }`,
      `Your STEM self efficacy circle is on the ${
        currentData.groupAverages.group_3_average > 5.5
          ? "larger size you feel very good about your ability to perform well on STEM related tasks."
          : "smaller size it is easy to grow this confidence by engaging in STEM related tasks/opportunities."
      }`,
      `Your STEM outcome expectations circle is ${
        currentData.groupAverages.group_4_average > 5.5
          ? "larger you probably believe that participation in STEM activities will help you in pursuing a STEM career."
          : "smaller you might not know yet how these STEM activities may benefit your future career, however, through experience in college your circle will likely grow as you gain more understanding and confidence in STEM activities."
      }`,
      `Your research outcome expectations circle is ${
        currentData.groupAverages.group_5_average > 5.5
          ? "larger you probably believe that participation in research related tasks will help you in pursuing you STEM major."
          : "smaller you might not know yet how these research related tasks may benefit your STEM major, however, by participating in research experiences such as labs/other activities your circle will likely grow as you gain more understanding and confidence in research related tasks."
      }`,
      `Your research self efficacy circle is on the ${
        currentData.groupAverages.group_6_average > 5.5
          ? "larger size you feel very good about your ability to perform well on research related tasks."
          : "smaller it is easy to grow this confidence by engaging in research related tasks/opportunities."
      }`,
    ];

    doc.setFontSize(10);
    const textWidth2 = 130;
    doc.text(doc.splitTextToSize(feedback[0], textWidth2), 70, 30);

    doc.text(doc.splitTextToSize(feedback[1], textWidth2), 10, 75);

    doc.text(doc.splitTextToSize(feedback[2], textWidth2), 70, 120);

    doc.text(doc.splitTextToSize(feedback[3], textWidth2), 10, 165);

    doc.text(doc.splitTextToSize(feedback[4], textWidth2), 70, 210);

    doc.text(doc.splitTextToSize(feedback[5], textWidth2), 10, 255);

    // Save or download the PDF
    doc.save("MySTEMGrowthProfile Report.pdf");
    document.getElementById("container-hidden").innerHTML = "";
  };

  const changeData = (dataIndex) => {
    setCurrentData(dataSet[dataIndex]);

    setCardText1(
      `Your civic engagement scale circle is ${
        dataSet[dataIndex].groupAverages.group_1_average > 5.5
          ? "larger, it is really important to you to use you career to better your community, you might be motivated by how your career will help others in your community"
          : "smaller you may not know how to get involved to help your community, but through programs like LSAMP you will learn how to get involved and better your community"
      }`
    );
    setCardText2(
      `Your STEM interest circle is ${
        dataSet[dataIndex].groupAverages.group_2_average > 5.5
          ? "larger, you indicated you liked different tasks associated with STEM. Since your circle is larger, it sounds like your interest is already high in there different STEM areas."
          : "smaller, you indicated you dislike different tasks associated with STEM. Don't worry if your circle is smaller, there is plenty of time to grow your interest in college."
      }`
    );
    setCardText3(
      `Your STEM self efficacy circle is on the ${
        dataSet[dataIndex].groupAverages.group_3_average > 5.5
          ? "larger size you feel very good about your ability to perform well on STEM related tasks."
          : "smaller size it is easy to grow this confidence by engaging in STEM related tasks/opportunities."
      }`
    );
    setCardText4(
      `Your STEM outcome expectations circle is ${
        dataSet[dataIndex].groupAverages.group_4_average > 5.5
          ? "larger you probably believe that participation in STEM activities will help you in pursuing a STEM career."
          : "smaller you might not know yet how these STEM activities may benefit your future career, however, through experience in college your circle will likely grow as you gain more understanding and confidence in STEM activities."
      }`
    );
    setCardText5(
      `Your research outcome expectations circle is ${
        dataSet[dataIndex].groupAverages.group_5_average > 5.5
          ? "larger you probably believe that participation in research related tasks will help you in pursuing you STEM major."
          : "smaller you might not know yet how these research related tasks may benefit your STEM major, however, by participating in research experiences such as labs/other activities your circle will likely grow as you gain more understanding and confidence in research related tasks."
      }`
    );
    setCardText6(
      `Your research self efficacy circle is on the ${
        dataSet[dataIndex].groupAverages.group_6_average > 5.5
          ? "larger size you feel very good about your ability to perform well on research related tasks."
          : "smaller it is easy to grow this confidence by engaging in research related tasks/opportunities."
      }`
    );

    if (chartType === "bubble") {
      drawBubbleChart(chart, dataSet[dataIndex], null, "container");
    } else {
      drawBarChart(chart, dataSet[dataIndex], null);
    }
    document.getElementById("mySelect2").value = "-1";
    setCompDataIndex(dataIndex);
  };

  const changeCompData = (dataIndex) => {
    var compareData = null;
    if (dataIndex !== -1) {
      compareData = dataSet[dataIndex];
      setCompData(compareData);
    } else {
      setCompData(null);
    }

    if (chartType === "bubble") {
      drawBubbleChart(chart, currentData, compareData, "container");
    } else {
      drawBarChart(chart, currentData, compareData);
    }
  };

  const toggleChartType = () => {
    if (chartType === "bubble") {
      setChartType("bar");
      drawBarChart(chart, currentData, compData);
    } else {
      setChartType("bubble");
      drawBubbleChart(chart, currentData, compData, "container");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="main-content">
        <div
          className="main-top"
          style={{ width: "100%", height: "100px", marginBottom: "20px" }}
        >
          <div className="header-profile">My Profile</div>
        </div>
        <div id="loading">
          <p>loading...</p>
        </div>
        <div
          id="noData"
          style={{
            display: "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>No data yet!</p>
          <p>Take a survey to view your results...</p>
          <button className="survey-button" onClick={() => navigate("/survey")}>
            Take Survey
          </button>
        </div>
        <div hidden={!currentData}>
          <div className="graph-container">
            <div
              style={{
                width: "100%",
                minWidth: "425px",
                maxWidth: "700px",
                height: "400px",
                borderStyle: "solid",
              }}
            >
              <div id="container" style={{ height: "400px" }}>
                loading data...
              </div>
            </div>
            <div className="button-container">
              <button className="results-button" onClick={getPngBase64String}>
                Download
              </button>
              <div>
                <p className="graph-label">Data:</p>
                <select
                  className="custom-select"
                  id="mySelect"
                  onChange={(e) => changeData(e.target.value)}
                >
                  {dataOptions.map((option, i) => (
                    <option value={`${dataOptions.length - i - 1}`}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="graph-label">Compare to:</p>
                <select
                  className="compare-select"
                  id="mySelect2"
                  onChange={(e) => changeCompData(e.target.value)}
                >
                  <option value="-1">None</option>
                  {compOptions.map((option, i) => (
                    <option
                      value={`${compOptions.length - i - 1}`}
                      hidden={compDataIndex == compOptions.length - i - 1}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button className="toggleChart" onClick={toggleChartType}>
                {chartType === "bubble"
                  ? "View as bar chart"
                  : "View as bubble chart"}
              </button>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Card
              id="Card1"
              title={<>Civic Engagement Behaviors</>}
              description={
                "Civic engagement scale tells you how important helping your community is to you."
              }
              moreInfo={cardText1}
              color={"#bf5fffff"}
            />
            <Card
              id="Card2"
              title={<>STEM Interests</>}
              description={
                "STEM interest is the degree to which you indicated your like or dislike of certain activities associated with STEM careers."
              }
              moreInfo={cardText2}
              color={"#4a86e8ff"}
            />
            <Card
              id="Card3"
              title={<>STEM Self Efficacy</>}
              description={
                "STEM self efficacy is your beliefs in your ability to do well in a particular task. Self efficacy is task specific, for example you can feel very good about your ability to take a math test but not so good about your ability to hit a homerun or vise versa."
              }
              moreInfo={cardText3}
              color={"#ff0000ff"}
            />

            <Card
              id="Card4"
              title={<>STEM Outcome Expectations</>}
              description={
                "STEM outcome expectations are the beliefs you hold about how your participation in STEM activities will benefit you in the future."
              }
              moreInfo={cardText4}
              color={"#ff9900ff"}
            />
            <Card
              id="Card5"
              title={<>Research Outcome Expectations</>}
              description={
                "Research outcome expectations are the beliefs you hold about how your participation in research related tasks will benefit you in the future."
              }
              moreInfo={cardText5}
              color={"#93c47dff"}
            />
            <Card
              id="Card6"
              title={<>Research Self Efficacy</>}
              description={
                "Research self efficacy is your beliefs in your ability to do well in research related tasks. Like with STEM self efficacy, research self efficacy is also task specific."
              }
              moreInfo={cardText6}
              color={"#fff16eff"}
            />
          </div>
          <div
            id="container-hidden"
            hidden={true}
            style={{
              height: "400px",
              width: "700px",
              position: "absolute",
              left: -1000,
            }}
          />
        </div>
      </div>
    </div>
  );
}
