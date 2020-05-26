import React, { useRef, useEffect, useState } from "react";
import {
  select,
  axisBottom,
  axisRight,
  scaleBand,
  scaleLinear,
  scaleThreshold,
} from "d3";
import "../assets/Responsive.scss";


//custom hooks, you can use a hook inside of the hook, useState hook is inside the custom hook
const UseResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    console.log(`observeTarget`, observeTarget);
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(entry => {
          setDimensions(entry.contentRect)
      })
      //set resize dimensions
    });
    resizeObserver.observe(observeTarget);
    //cleanup
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  //dimensions width and height
  return dimensions;
};

function Responsive({ data }) {
  const svgRef = useRef();
  
  const wrapperRef = useRef();
  console.log(wrapperRef);
  const dimensions = UseResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    //if there are no dimensions dont do anything
    if(!dimensions) return

    const xScale = scaleBand()
      //.domain([0, 1, 2, 3, 4]) same as alternative below
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([dimensions.height, 0]);

    //option 3
    const colorScale = scaleThreshold()
      .domain([10, 40, 60, 70, 150])
      .range(["yellow", "orange", "blue", "purple", "maroon"]);
    //.range(["yellow", "orange", "blue", "purple", "maroon"])
    //to make values lower than 40 a solid color

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg.select(".x-axis").style("transform", `translateY(${dimensions.height}px)`).call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", `translateX(${dimensions.width}px)`).call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      //flip the bars
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".toolTip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value)))
          .attr("class", "toolTip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          //position of value, should be a y position -8 to make higher than bar
          .attr("y", yScale(value) - 8)
          .attr("text-anchor", "middle")
          .transition()
          .attr("opacity", 1)
          .attr("stroke", "blue");
      })
      .on("mouseleave", () => {
        svg.select(".toolTip").remove();
      })
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    <div className="responsive">
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </div>
  );
}
export default Responsive;
