import React from "react";
import "./MainDash.css";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import Head from "../Head/Head";

const MainDash = () => {
  return (
    
    <div className="MainDash">
              
           
            {/* Mocked Audio Graph */}
            {/* <div className="audio-graph">
              {[...Array(20)].map((_, index) => (
                <div key={index} className={`bar ${index ===  15 ? "active" : ""}`} />
              ))}
            </div> */}
              <Head/>
            <Cards />
            <Table />
</div>
        );
      };

export default MainDash;