import React, { useRef, useEffect, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisLeft,
} from "d3";
//https://www.youtube.com/watch?v=yhwHUmjqxQw
const D3Line = () => {
  const [data, setData] = useState([24, 43, 50, 17, 45, 32, 45]);

  const svgRef = useRef();
  console.log(`svgRef.current`,svgRef)

  useEffect(() => {
    //select gives me access to d3
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear()
      .range([300, 0])
      .domain([0, Math.max(...data)]);

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);
    svg.select(".x-Axis").style("transform", "translateY(130px)").call(xAxis);

    const yAxis = axisLeft(yScale).ticks(data.length);
    svg.select(".y-Axis").style("transform", "translateX(300px)").call(yAxis);

    //will generate the d attribute, based upon data received
    const myLine = line()
      //make x 50px apart
      .x((value, index) => xScale(index))
      //.y((value) => yScale(value)) or below
      .y(yScale)
      .curve(curveCardinal);

    //.selectAll("path")
    svg
      .selectAll("path")
      //.selectAll("line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => myLine(value))
      .attr("fill", "yellow")
      .attr("stroke", "red");

    svg
      .selectAll("rect")
      .data(data)
      .join(
        //add attr to both entering and updating
        (enter) => enter.append("rect"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("width", (value) => value)
      .attr("height", (value) => value)
      .attr("x", (value) => value * 2)
      .attr("y", (value) => value * 2)
      .attr("fill", "rgb(0,0,255)");
    console.log(svg.selectAll("rect").data(data)); console.log(`svgRef.current`,svg)
    //can see Enter, Update (-groups), Exit
  }, [data]);
 

  return (
    <div style={{ width: 500 }}>
      <React.Fragment>
        <svg ref={svgRef}>
          <g className="x-Axis" />
          <g className="y-Axis" />
          <br></br>
          <br></br>
          {/* hard coded d attribute */}
          {/* <path d="M0, 150, 100, 50, 150" stroke="green" fill="none" /> */}
        </svg>

        <button onClick={() => setData(data.map((value) => value * 2))}>
          Data by 2
        </button>
        <button onClick={() => setData(data.filter((value) => value < 100))}>
          Data by 2
        </button>
      </React.Fragment>
    </div>
  );
};
export default D3Line;
