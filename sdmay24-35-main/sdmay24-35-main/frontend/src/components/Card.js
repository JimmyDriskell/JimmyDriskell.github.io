import React, { useState } from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";

const info = require("../images/info_icon.png");

const Card = ({ id, title, description, moreInfo, color }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="card">
      <div className="card-header" style={{ backgroundColor: color }}>
        <h3>{title}</h3>
        <img
          src={info}
          alt="info"
          className="info-icon"
          onClick={() => navigate("/about")}
        />
      </div>
      <div className="card-body">
        <div className="description-container"></div>
        {showMore && <p id={`moreInfo-${id}`}>{moreInfo}</p>}
        <button className="toggle-btn" onClick={toggleShowMore}>
          {showMore ? "Show Less \u25B4" : "Show More \u25BE"}
        </button>
      </div>
    </div>
  );
};

export default Card;
