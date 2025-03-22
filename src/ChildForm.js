import React, { useState } from "react";

function ChildForm({ addChild }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [ADHD, setAdh]= useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !photo || !ADHD ) {
      setError("All fields are required!");
      return;
    }
    addChild({ name, age, ADHD, photo });
    setName("");
    setAge("");
setAdh("");
    setPhoto(null);
    setError("");
  };

  return (
    <div className="child-form">
      <h2>Add Child</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Child's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Child's Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="ADHD Details"
          value={ADHD}
          onChange={(e) => setAdh(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
}

export default ChildForm;
