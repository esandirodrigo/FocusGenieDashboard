import React from "react";
import DailyTips from "../DailyTips/DailyTips";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        
        <Updates />
      
        <DailyTips />
      </div>
    </div>
  );
};

export default RightSide;
