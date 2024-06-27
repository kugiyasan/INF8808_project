import * as d3 from "d3";

import React, { useEffect, useRef } from "react";

import { Entry } from "../../../dataset";

interface BoxPlotD3Props {
  data: Entry[];
  genres: string[];
}

interface BoxPlotData {
  genre: string;
  explicit: boolean;
  q1: number;
  median: number;
  q3: number;
  min: number;
  max: number;
}

const getBoxPlotData = (
  dataset: Entry[],
  selectedGenres: string[],
): BoxPlotData[] => {
  const filteredData = dataset.filter((track) =>
    selectedGenres.includes(track.track_genre),
  );

  const groupedData = d3.groups(filteredData, (d) => d.track_genre);
  const boxPlotData: BoxPlotData[] = [];

  groupedData.forEach(([genre, tracks]) => {
    [0, 1].forEach((explicit) => {
      const filteredTracks = tracks.filter((track) => track.explicit === explicit);
      const popularities = filteredTracks
        .map((track) => track.popularity)
        .sort(d3.ascending);
      boxPlotData.push({
        genre,
        explicit: !!explicit,
        q1: d3.quantile(popularities, 0.25) ?? 0,
        median: d3.quantile(popularities, 0.5) ?? 0,
        q3: d3.quantile(popularities, 0.75) ?? 0,
        min: d3.min(popularities) ?? 0,
        max: d3.max(popularities) ?? 0,
      });
    });
  });

  return boxPlotData;
};

const BoxPlotExplicit: React.FC<BoxPlotD3Props> = ({ data, genres }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const margin = { top: 40, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const boxPlotData = getBoxPlotData(data, genres);

    const x = d3.scaleBand().domain(genres).range([0, width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, 1]).nice().range([height, 0]);

    // Add legend
    const legendData = [
      { color: "#ff6961", label: "Explicit" },
      { color: "#77dd77", label: "Non-Explicit" },
    ];

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y));

    const boxWidth = x.bandwidth() / 3;

    const boxGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    boxGroup
      .selectAll("g")
      .data(boxPlotData)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d) => `translate(${x(d.genre)! + x.bandwidth() / 2 - (d.explicit ? boxWidth / 2 : -boxWidth / 2)},0)`,
      )
      .each(function (d) {
        const g = d3.select(this);

        // Draw box
        g.append("rect")
          .attr("x", -boxWidth / 2)
          .attr("y", y(d.q3))
          .attr("height", y(d.q1) - y(d.q3))
          .attr("width", boxWidth)
          .attr("stroke", "black")
          .attr("fill", d.explicit ? "#ff6961" : "#77dd77");

        // Draw median line
        g.append("line")
          .attr("x1", -boxWidth / 2)
          .attr("x2", boxWidth / 2)
          .attr("y1", y(d.median))
          .attr("y2", y(d.median))
          .attr("stroke", "black");

        // Draw min line
        g.append("line")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", y(d.min))
          .attr("y2", y(d.q1))
          .attr("stroke", "black");

        // Draw max line
        g.append("line")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", y(d.q3))
          .attr("y2", y(d.max))
          .attr("stroke", "black");
      });
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 100},${margin.top})`);

    legend.selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (_d, i) => i * 20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", d => d.color);

    legend.selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 24)
      .attr("y", (_d, i) => i * 20 + 9)
      .attr("dy", ".35em")
      .text(d => d.label);

  }, [data, genres]);


  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <svg
        ref={svgRef}
        width={800}
        height={400}
        style={{ backgroundColor: "#00cc66" }}
      ></svg>
    </div>
  );
};

export default BoxPlotExplicit;
