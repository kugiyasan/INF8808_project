import * as d3 from "d3";

import React, { useEffect, useRef } from "react";

import { Entry } from "../../../dataset";

interface RidgelinePlotProps {
  data: Entry[];
  selectedGenres: string[];
  kernelBandwidth: number;
  numTicks: number;
}

const RidgelinePlot: React.FC<RidgelinePlotProps> = ({
  data,
  selectedGenres,
  kernelBandwidth,
  numTicks,
}) => {
  const chartRefs = useRef<(SVGSVGElement | null)[]>([]);
  const xAxisRef = useRef<SVGSVGElement | null>(null);
  const scaleRef = useRef(d3.scaleLinear().domain([0, 100]).range([0, 800]));

  useEffect(() => {
    const margin = { top: 0, right: 30, bottom: 60, left: 110 };
    const width = 800 - margin.left - margin.right;
    const height = 180 - margin.top - margin.bottom; // Adjust height to fit multiple graphs

    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    scaleRef.current = x; // Update scaleRef to use the initial scale

    // Draw the shared x-axis
    const xAxisSvg = d3
      .select(xAxisRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", margin.bottom)
      .html("") // Clear previous contents
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`);

    const xAxisGroup = xAxisSvg
      .append("g")
      .attr("transform", `translate(0, 20)`)
      .call(d3.axisBottom(x));

    selectedGenres.forEach((genre, index) => {
      const svg = d3
        .select(chartRefs.current[index])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height)
        .html("") // Clear previous contents
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Define gradient
      const defs = svg.append("defs");

      // Define clip path
      defs.append("clipPath")
        .attr("id", `clip-${index}`)
        .append("rect")
        .attr("width", width)
        .attr("height", height);

      const gradient = defs
        .append("linearGradient")
        .attr("id", `gradient-${index}`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "lightgreen")
        .attr("stop-opacity", 1);
      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "lightgreen")
        .attr("stop-opacity", 0);

      const kde = kernelDensityEstimator(
        kernelEpanechnikov(kernelBandwidth),
        x.ticks(numTicks)
      );
      const density = kde(
        data
          .filter((d) => d.track_genre === genre)
          .map((d) => d.popularity * 100)
      );

      // Create a Y scale for densities
      const y = d3.scaleLinear().domain([0, 0.08]).range([height, 0]);

      // Add area
      svg
        .append("path")
        .datum(density)
        .attr("fill", `url(#gradient-${index})`)
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("clip-path", `url(#clip-${index})`)
        .attr(
          "d",
          d3
            .area()
            .curve(d3.curveBasis)
            .x((d) => x(d[0]))
            .y0(y(0))
            .y1((d) => y(d[1]))
        );

      // Add invisible overlay for capturing hover events
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mousemove", function (event) {
          const [mouseX, mouseY] = d3.pointer(event);
          const invertedX = scaleRef.current.invert(mouseX); // Use scaleRef.current
          const closestDensity = density.reduce((prev: number[], curr: number[]) =>
            Math.abs(curr[0] - invertedX) < Math.abs(prev[0] - invertedX) ? curr : prev
          );
          const popularityScore = closestDensity[0];
          const densityValue = closestDensity[1];

          if (y(densityValue) <= mouseY) {
            tooltip
              .style("left", `${event.pageX + 5}px`)
              .style("top", `${event.pageY + 5}px`)
              .style("display", "inline-block")
              .style("background-color", "lightgray")
              .style("border", "1px solid #ccc")
              .style("color", "black")
              .html(`
                <div>
                  Popularity Score: ${popularityScore.toFixed(2)}<br>
                  Density: ${densityValue.toFixed(4)}<br>
                </div>
              `);
          } else {
            tooltip.style("left", `${event.pageX + 5}px`)
              .style("top", `${event.pageY + 5}px`)
              .style("display", "inline-block")
              .style("background-color", "lightgray")
              .style("border", "1px solid #ccc")
              .style("color", "black")
              .html(`
                <div>
                  Popularity Score: ${popularityScore.toFixed(2)}<br>
                </div>
              `);
          }
        })
        .on("mouseleave", function () {
          tooltip.style("display", "none");
        });

      // Add title
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "16px")
        .text(genre);

      // Tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("display", "none")
        .style("pointer-events", "none");

      // Hover interaction
      svg
        .selectAll("path")
        .on("mouseover", function () {
          d3.select(this).attr("fill", "darkred");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", `url(#gradient-${index})`);
        });

      // Zoom interaction
      const zoom = d3.zoom<any, any>()
        .scaleExtent([1, 10]) // Limits the zoom scale
        .translateExtent([[0, 0], [width, height]]) // Limits the translation extent
        .on("zoom", (event) => {
          const newX = event.transform.rescaleX(x);
          scaleRef.current = newX; // Update scaleRef with new scale
          xAxisGroup.call(d3.axisBottom(newX));
          selectedGenres.forEach((_genre, i) => {
            const svg = d3.select(chartRefs.current[i]).select("g");
            svg.selectAll("path").attr(
              "d",
              //@ts-ignore
              d3
                .area()
                .curve(d3.curveBasis)
                .x((d) => newX(d[0]))
                .y0(y(0))
                .y1((d) => y(d[1]))
            );
          });
        });

      svg.call(zoom);

      function kernelDensityEstimator(kernel: any, X: any) {
        return function (V: any) {
          return X.map((x: any) => [x, d3.mean(V, (v: any) => kernel(x - v))]);
        };
      }

      function kernelEpanechnikov(k: any) {
        return function (v: any) {
          return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
        };
      }
    });
  }, [data, selectedGenres, kernelBandwidth, numTicks]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {selectedGenres.map((genre, index) => (
        <svg key={genre} ref={(el) => (chartRefs.current[index] = el)}></svg>
      ))}
      <svg ref={xAxisRef}></svg>
    </div>
  );
};

export default RidgelinePlot
