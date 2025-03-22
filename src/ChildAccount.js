import React, { useState } from "react";
import ChildProfile from "./ChildProfile";

function ChildAccount({ children, removeChild }) {
  const [selectedChild, setSelectedChild] = useState(null);

  return (
    <div className="cx">
      <ChildProfile children={children} selectChild={setSelectedChild} removeChild={removeChild} />

      {selectedChild && (
        <div className="child-details">
          <h2>{selectedChild.name}</h2>
          <p>Age: {selectedChild.age}</p>
          <p><strong>ADHD Details:</strong> {selectedChild.ADHD}</p>
          <img src={selectedChild.photo} alt={selectedChild.name} />
        </div>
      )}
    </div>
  );
}

export default ChildAccount;
