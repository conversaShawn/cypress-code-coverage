import React from "react";
import Points from "../points/Points";

export default function MapCategories() {
  const categories = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5"];
  return (
    <div className="categoriesContainer">
      {categories.map((c, index) => (
        <div key={c.name + "-" + index}>{c}<Points /></div>
      ))}
    </div>
  );
}
