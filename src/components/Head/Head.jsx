import React from "react";
import Genie from "./Genie.png";
import Logo9 from "./logo9.png";
import "../Head/Head.css";

export default function DescriptionAlerts() {
  return (
    <div className="Head">
      {/* Left Image */}
      <img className="image" src={Logo9} alt="Logo" />

      {/* Center Content */}
      <div className="content">
        <h1 className="date-range">Weekly Summary</h1>
        <p className="date-range1">01 - 25 March, 2020</p>
      </div>

      {/* Right Image */}
      <img className="image1" src={Genie} alt="Genie" />
    </div>
  );
}
