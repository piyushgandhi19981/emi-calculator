import React from "react";

function Input({ title, data, setData }) {
  return (
    <div className="input-container">
      <div className="title">{title}</div>
      <input
        type="number"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
    </div>
  );
}

export default Input;
