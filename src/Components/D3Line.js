import React, { useRef, useEffect, useState } from "react";
import { select, line, curveCardinal } from "d3";

const D3Line = () => {
  const [data, setData] = useState([24, 43, 50, 17, 45, 32, 45, 64]);

  const svgRef = useRef();

  console.log(data);

  useEffect(() => {
    //select gives me access to d3
    const svg = select(svgRef.current);
    //will generate the d attribute, based upon data received
    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 150 - value)
      .curve(curveCardinal);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
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
    console.log(svg.selectAll("rect").data(data));
    //can see Enter, Update (-groups), Exit
  }, [data]);

  return (
    <div style={{ width: 500 }}>
      <React.Fragment>
        <svg ref={svgRef}>
          {/* hard coded d attribute */}
          <path d="M0, 150, 100, 50, 150" stroke="green" fill="none" />
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
