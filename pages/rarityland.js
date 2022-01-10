import * as d3 from "d3";
import { useEffect, useState } from "react";

const sample = [
  {
    key: "RarityLand Map",
    values: [
      { owner: "0x888", coordX: 0, coordY: 0 },
      { owner: "0x888", coordX: 1, coordY: 0 },
      { owner: "0x888", coordX: 2, coordY: 0 },
      { owner: "0x888", coordX: 3, coordY: 0 },
      { owner: "0x888", coordX: 4, coordY: 0 },
      { owner: "0x888", coordX: 5, coordY: 0 },
      { owner: "0x888", coordX: 6, coordY: 0 },
      { owner: "0x888", coordX: 7, coordY: 0 },
      { owner: "0x888", coordX: 8, coordY: 0 },
      { owner: "0x888", coordX: 9, coordY: 0 },
      { owner: "0x888", coordX: 0, coordY: 1 },
      { owner: "0x888", coordX: 1, coordY: 1 },
      { owner: "0x888", coordX: 2, coordY: 1 },
      { owner: "0x888", coordX: 3, coordY: 1 },
      { owner: "0x888", coordX: 4, coordY: 1 },
      { owner: "0x888", coordX: 5, coordY: 1 },
      { owner: "0x888", coordX: 6, coordY: 1 },
      { owner: "0x888", coordX: 7, coordY: 1 },
      { owner: "0x888", coordX: 8, coordY: 1 },
      { owner: "0x888", coordX: 9, coordY: 1 },
    ],
  },
];

const RarityLand = () => {
  useEffect(() => {
    let test = {
      key: "RarityLand Map",
      values: [],
    };

    Array.from(Array(10), (_, x) => {
      Array.from(Array(10), (_, y) => {
        let temp = { owner: "0x888", coordX: x, coordY: y };
        test["values"] = [...test["values"], temp];
      });
    });

    const svg = d3.select("#svg");
    const cellSize = 25;
    const yearHeight = cellSize * 7;

    const group = svg.append("g");

    const year = group
      .selectAll("g")
      .data([test])
      .join("g")
      .attr("transform", (d, i) => `translate(50, ${yearHeight * i + cellSize * 1.5})`)
      .attr("fill", "white");

    year
      .append("g")
      .selectAll("rect")
      .data((d) => d.values)
      .join("rect")
      .attr("width", cellSize - 1.5)
      .attr("height", cellSize - 1.5)
      .attr("x", (d, i) => d.coordX * cellSize + 10)
      .attr("y", (d, i) => d.coordY * cellSize)
      .attr("fill", (d) => d.owner === "0x888" && "white")
      .append("title")
      .text((d) => `${d.owner} at ${d.coordX} and ${d.coordY}`);
  }, []);

  return (
    <div className="container mx-auto flex pt-10 pb-20">
      <svg id="svg" className="border w-full min-h-screen"></svg>
    </div>
  );
};

export default RarityLand;
