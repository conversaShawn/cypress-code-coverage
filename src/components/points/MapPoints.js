import React from "react";

export default function MapPoints() {
  const points = [100, 200, 300, 400, 500];

  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }
  return (
    <div onClick={handleSubmit}>
      {points.map((p) => (
        <div type="submit">{p}</div>
      ))}
    </div>
  );
}
