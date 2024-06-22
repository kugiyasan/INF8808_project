import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Entry } from "../../../dataset";

interface ScatterPlotProps {
  data: Entry[];
  xAxis: string;
  yAxis: string;
  selectedGenres: string[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xAxis,
  yAxis,
  selectedGenres,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous content

      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const filteredData =
        selectedGenres.length > 0
          ? data.filter((d) => selectedGenres.includes(d.track_genre))
          : data;

      const x = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(filteredData, (d) => d[xAxis as keyof Entry] as number)!,
        ])
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(filteredData, (d) => d[yAxis as keyof Entry] as number)!,
        ])
        .range([height, 0]);

      const colorScale = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(Array.from(new Set(data.map((d) => d.track_genre))));

      const xAxisGenerator = d3.axisBottom(x);
      const yAxisGenerator = d3.axisLeft(y);

      const svgElement = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      svgElement
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxisGenerator);

      svgElement.append("g").call(yAxisGenerator);

      svgElement
        .selectAll(".dot")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => x(d[xAxis as keyof Entry] as number))
        .attr("cy", (d) => y(d[yAxis as keyof Entry] as number))
        .attr("r", 5)
        .attr("fill", (d) => colorScale(d.track_genre));

      // X-axis label
      svgElement
        .append("text")
        .attr(
          "transform",
          `translate(${width / 2}, ${height + margin.bottom - 10})`,
        )
        .style("text-anchor", "middle")
        .text(xAxis.charAt(0).toUpperCase() + xAxis.slice(1));

      // Y-axis label
      svgElement
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .style("text-anchor", "middle")
        .text(yAxis.charAt(0).toUpperCase() + yAxis.slice(1));

      if (legendRef.current) {
        const legendContainer = d3.select(legendRef.current);
        legendContainer.selectAll("*").remove(); // Clear previous content

        const genres =
          selectedGenres.length > 0 ? selectedGenres : colorScale.domain();
        const legend = legendContainer
          .selectAll(".legend-item")
          .data(genres)
          .enter()
          .append("div")
          .attr("class", "legend-item");

        legend
          .append("span")
          .attr("class", "legend-color")
          .style("background-color", (d) => colorScale(d));

        legend
          .append("span")
          .attr("class", "legend-label")
          .text((d) => d);
      }
    }
  }, [data, xAxis, yAxis, selectedGenres]);

  return (
    <div className="scatterplot-wrapper">
      <svg ref={svgRef} width="800" height="400"></svg>
      <div ref={legendRef} className="legend"></div>
    </div>
  );
};

export default ScatterPlot;
