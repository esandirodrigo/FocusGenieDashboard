import React from "react";
import "./Updates.css";
import { UpdatesData } from "../../Data/Data";

// Function to return styles based on status
const makeStyle=(status)=>{
  if(status === 'Improved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Bad')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}
const Updates = () => {
  return (
    <div className="Updates">
      <h3>Today</h3>
      {UpdatesData.map((update, index) => (
        <div className="update" key={index}>
          <img src={update.img} alt="profile" />
          <div className="noti">
            <div style={{  marginBottom: "0.5rem" }}>
              <span>{update.name}</span>
              <div >
              <span className="status" style={  makeStyle(update.status)}> {update.status}</span>
            </div>
            </div>
            <span>{update.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Updates;
