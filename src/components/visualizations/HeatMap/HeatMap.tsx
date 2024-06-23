import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Entry } from "../../../dataset";

interface Correlation {
  factor1: keyof Entry;
  factor2: keyof Entry;
  value: number;
}

interface HeatmapD3Props {
  factors: string[];
}

const buildHeatmap = (
  svgRef: React.MutableRefObject<SVGSVGElement | null>,
  correlations: Correlation[],
  factors: string[],
) => {
  const margin = { top: 50, right: 50, bottom: 100, left: 100 };
  const width = 700 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;

  const x = d3.scaleBand().range([0, width]).domain(factors).padding(0.01);
  const y = d3.scaleBand().range([height, 0]).domain(factors).padding(0.01);

  const color = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]);

  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove(); // Clear previous content

  const svgElement = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svgElement
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(45)")
    .attr("x", 9)
    .attr("y", 0)
    .attr("dy", ".35em")
    .style("text-anchor", "start");

  svgElement.append("g").call(d3.axisLeft(y));

  svgElement
    .selectAll()
    .data(correlations)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.factor1)!)
    .attr("y", (d) => y(d.factor2)!)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", (d) => color(d.value));

  svgElement
    .selectAll()
    .data(correlations)
    .enter()
    .append("text")
    .attr("x", (d) => x(d.factor1)! + x.bandwidth() / 2)
    .attr("y", (d) => y(d.factor2)! + y.bandwidth() / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text((d) => d.value.toFixed(2))
    .style("fill", "black");
};

const HeatmapD3: React.FC<HeatmapD3Props> = ({ factors }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [correlations, setCorrelations] = useState<Correlation[]>();

  useEffect(() => {
    d3.json("./heatmap.json")
      .then((c) => {
        setCorrelations(c as Correlation[]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (correlations === undefined) {
      return;
    }

    const c = correlations.filter(
      (entry) =>
        factors.includes(entry.factor1) && factors.includes(entry.factor2),
    );
    buildHeatmap(svgRef, c, factors);
  }, [correlations, factors]);

  if (factors.length < 1) {
    return <svg width="700" height="700"></svg>;
  }

  return <svg ref={svgRef} width="700" height="700"></svg>;
};

export default HeatmapD3;
