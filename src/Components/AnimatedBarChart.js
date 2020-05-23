import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, axisRight, scaleBand, scaleLinear, schemeRdBu, scaleSqrt, scaleOrdinal, scaleThreshold } from "d3";
import "../assets/Animated.scss";

function BarChart() {
  const [data, setData] = useState([5, 17, 33, 80, 45]);
  const svgRef = useRef();

  console.log(`data`, data);
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      //.domain([0, 1, 2, 3, 4]) same as alternative below
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    //option 1
    //high value on y-axis is 150
    //could use scaleSqrt to show clear differences between, or scaleLinear
    // const colorScale = scaleSqrt()
    //   .domain([0, 150])
    //   .range(["yellow", "maroon"]);

    //option 2
    //make bars a certain color under a value, less than x value will be orange
    //bars under 40 will be yellow
    //https://observablehq.com/@d3/color-legend
    // const colorScale = scaleLinear()
    //   .domain([30, 40, 60, 70, 150])
    //   .range(["yellow", "orange", "blue", "purple", "maroon"])
    //   //to make values lower than 40 a solid color
    //   .clamp(true) 

    //option 3
      const colorScale = scaleThreshold()
      .domain([10, 40, 60, 70, 150])
      .range(["yellow", "orange", "blue", "purple", "maroon"])
      //.range(["yellow", "orange", "blue", "purple", "maroon"])
      //to make values lower than 40 a solid color



    const xAxis = axisBottom(xScale).ticks(data.length);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg
      .selectAll("bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      //flip the bars
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("width", xScale.bandwidth())
      .attr("y", -150)
      .attr("height", (value) => 150 - yScale(value))
      .transition()
      .attr("height", (value) => 150 - yScale(value))
      .attr('fill', (value) => colorScale(value))
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
    </React.Fragment>
  );
}
export default BarChart;
