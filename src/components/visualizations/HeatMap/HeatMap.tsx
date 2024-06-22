import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface HeatmapD3Props {
  data: any[];
  factors: string[];
}

const HeatmapD3: React.FC<HeatmapD3Props> = ({ data, factors }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && factors.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous content

      const margin = { top: 50, right: 50, bottom: 100, left: 100 };
      const width = 700 - margin.left - margin.right;
      const height = 700 - margin.top - margin.bottom;

      const x = d3.scaleBand().range([0, width]).domain(factors).padding(0.01);

      const y = d3.scaleBand().range([height, 0]).domain(factors).padding(0.01);

      const color = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      const svgElement = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const correlations = calculateCorrelations(data, factors);

      svgElement
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(90)")
        .attr("x", 9)
        .attr("y", 0)
        .attr("dy", ".35em")
        .style("text-anchor", "start");

      svgElement.append("g").call(yAxis);

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
    }
  }, [data, factors]);

  const calculateCorrelations = (data: any[], factors: string[]) => {
    const correlations = [];
    for (let i = 0; i < factors.length; i++) {
      for (let j = 0; j < factors.length; j++) {
        const factor1 = factors[i];
        const factor2 = factors[j];
        const correlation = calculateCorrelation(
          data.map((d) => d[factor1]),
          data.map((d) => d[factor2]),
        );
        correlations.push({ factor1, factor2, value: correlation });
      }
    }
    return correlations;
  };

  const calculateCorrelation = (x: number[], y: number[]): number => {
    const n = x.length;
    const meanX = d3.mean(x);
    const meanY = d3.mean(y);
    const covariance =
      d3.sum(x.map((xi, i) => (xi - meanX!) * (y[i] - meanY!))) / n;
    const stdDevX = Math.sqrt(
      d3.sum(x.map((xi) => Math.pow(xi - meanX!, 2))) / n,
    );
    const stdDevY = Math.sqrt(
      d3.sum(y.map((yi) => Math.pow(yi - meanY!, 2))) / n,
    );
    return covariance / (stdDevX * stdDevY);
  };

  return <svg ref={svgRef} width="700" height="700"></svg>;
};

export default HeatmapD3;
