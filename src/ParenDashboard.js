import React, { useState } from 'react';
import AddChildForm from './ChildForm';
import ChildAccount from './ChildAccount';
import "./Account.css";

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);

  const addChild = (child) => {
    setChildren([child, ...children]); // Add new child at the top
  };

  const removeChild = (childToRemove) => {
    setChildren(children.filter((child) => child !== childToRemove));
  };

  return (
    <div className="Parent-container">
      <AddChildForm addChild={addChild} />
      <ChildAccount children={children} removeChild={removeChild} />
    </div>
  );
};

export default ParentDashboard;
