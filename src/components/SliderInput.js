import React from "react";

function SliderInput({ title, data, setData, labelMin, labelMax, min, max }) {
  return (
    <div className="input-container">
      <div className="title">{title}</div>
      <input
        type="range"
        value={data}
        min={min}
        max={max}
        onChange={(e) => setData(e.target.value)}
        className="slider"
      />
      <div className="label-container">
        <lable>{labelMin}</lable>
        <b>{data}</b>
        <lable>{labelMax}</lable>
      </div>
    </div>
  );
}

export default SliderInput;
