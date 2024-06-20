import React, { FC, useEffect, useRef } from "react";
import RadarChart from "./RadarChart";
import * as d3 from "d3";
import { Entry } from "../dataset";

interface SpiderChartProps {
  dataset: Entry[];
}

type SpiderChartData = { axis: string; value: number }[][];

const getSpiderChartData = (dataset: Entry[]): { data: SpiderChartData; genres: string[] } => {
  const spokeLabels = [
    "popularity",
    "danceability",
    "energy",
    "mode",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
  ];

  const groupByGenre = dataset.reduce(
    (acc, row) => {
      const key = row.track_genre;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(row as unknown as d3.DSVRowString);
      return acc;
    },
    {} as Record<string, d3.DSVRowString[]>,
  );

  const data = [];
  const genres = [];

  for (const [genre, group] of Object.entries(groupByGenre)) {
    const entry = [];
    for (const label of spokeLabels) {
      const mean = d3.mean(group.map((row) => Number(row[label])));
      entry.push({ axis: label, value: mean! });
    }
    data.push(entry);
    genres.push(genre);
  }

  return { data, genres };
};

const SpiderChart: FC<SpiderChartProps> = ({ dataset }) => {
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right;
  const height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

  const { data, genres } = getSpiderChartData(dataset);

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1,
      levels: 5,
      roundStrokes: true,
    };

    RadarChart(ref.current, data.slice(0, 5), radarChartOptions);
  createLegend();

}, []);

  const createLegend = () => {
    const legendContainer = d3.select(ref.current);
    if (legendContainer.select("h2").empty()) {
      // Ajouter le titre "Legend" s'il n'existe pas encore
      legendContainer.append("h2").text("Legend");
    }

    const colorLegend = legendContainer
      .selectAll(".color-legend")
      .data(genres.slice(0, 5))
      .enter()
      .append("div")
      .attr("class", "color-legend");

    colorLegend
    .append("svg")
    .attr("width", 10)
    .attr("height", 10)
    .append("circle")
    .attr("cx", 5)
    .attr("cy", 5)
    .attr("r", 4)
    .style("fill", "red");

    colorLegend.append("span").text((d) => d);
  };
  
  return <div ref={ref}></div>;
};

export default SpiderChart;
