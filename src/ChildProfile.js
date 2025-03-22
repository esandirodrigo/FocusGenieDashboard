import React from "react";
import { FaTrash } from "react-icons/fa"; // ✅ Import trash icon

function ChildProfile({ children, selectChild, removeChild }) {
  return (
    <div className="chi-files">
      {children.map((child, index) => (
        <div key={index} className="child-box">
          <img src={child.photo} alt={child.name} onClick={() => selectChild(child)} />
          <p>{child.name}</p>
          {/* ✅ Add remove button */}
          <button className="remove-btn" onClick={() => removeChild(child)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChildProfile;
