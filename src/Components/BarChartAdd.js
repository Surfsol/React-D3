import React, { useRef, useEffect, useState } from "react";
import {
  select,
  axisBottom,
  axisRight,
  scaleBand,
  scaleLinear,
  schemeRdBu,
  scaleSqrt,
  scaleOrdinal,
  scaleThreshold,
} from "d3";
import "../assets/Animated.scss";

function BarChart() {
  const [data, setData] = useState([5, 17, 33, 80, 45]);
  const svgRef = useRef();

  useEffect(() => {
    console.log(`data`, data);
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      //.domain([0, 1, 2, 3, 4]) same as alternative below
      .domain(data.map((value, index) => index))
      .range([0, 300])
      //separation between bars
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    //option 3
    const colorScale = scaleLinear()
      .domain([30, 40, 60, 70, 150])
      .range(["yellow", "orange", "blue", "purple", "maroon"])
      //to make values lower than 40 a solid color
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);
    //make sure .attr are in correct order
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      //flip the bars
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".toolTip")
          .data([value])
          .join((enter) => enter.append("text")
          .attr("y", yScale(value)))
          .attr("class", "toolTip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          //position of value, should be a y position -8 to make higher than bar
          .attr("y", yScale(value) - 8)
          .attr("text-anchor", "middle")
          .transition()
          .attr("opacity", 1)
          .attr('stroke', 'blue');
      })
      .on("mouseleave", () => {
        svg.select(".toolTip").remove();
      })
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => 150 - yScale(value));
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
      <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>
        Filter Add
      </button>
    </React.Fragment>
  );
}
export default BarChart;
