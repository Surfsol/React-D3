import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";

const D3Shapes = () => {
  const [data, setData] = useState([24, 43, 50, 17]);
  const data2 = [10, 33, 12, 170];
  const svgRef = useRef();
console.log(`data`, data)

  console.log(`svgRef`,svgRef)

  useEffect(() => {
    //select gives me access to d3
    const svg = select(svgRef.current);
    const svg2 = select(svgRef.current);
    //find all circles and sync with data
    //.join allows you to control enter, update and exit patterns
    svg
      .selectAll("circle")
      .data(data)
      .join(
        //add attr to circles entering, not existing
        (enter) =>
          enter
            .append("circle")
            .attr("r", (value) => value)
            .attr("cx", (value) => value * 3)
            .attr("cy", (value) => value * 1)
            .attr("stroke", "red"),
        //updates existing elements
        (update) =>
          update
            .attr("class", "updated")
            .attr("r", (value) => value)
            .attr("cy", (value) => value * 1)
            .attr("stroke", "yellow"),
        //default, do not need, but could use to animate exiting elements
        (exit) => exit.remove()
      );

    svg2
      .selectAll("rect")
      .data(data2)
      .join(
        //add attr to both entering and updating
        (enter) => enter.append("rect"),
        (update) => update.attr("class", "updated2"),
        (exit) => exit.remove()
      )
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 4)
      .attr("cy", (value) => value * 1)
      .attr("stroke", "green");
      console.log(`circles`, svg.selectAll("circle").data(data));
      console.log(`circles`, svg.selectAll("circle"));

      console.log(`svg`,svg)
    //can see Enter, Update (-groups), Exit
  }, [data]);

  return (
    <React.Fragment>
      <div>
        <svg ref={svgRef}>
          <circle />
          <square />
        </svg>
      </div>
      <button onClick={() => setData(data.map(value => value * 2)) }>Data by 2</button>
      <button onClick={() => setData(data.filter(value => value < 100)) }>Data by 2</button>
    </React.Fragment>
  );
};
export default D3Shapes;
