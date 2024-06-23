import { FC, useEffect, useRef } from "react";
import RadarChart from "./RadarChart";
import * as d3 from "d3";
import { Entry } from "../../../dataset";
import { GENRES } from "../../../genres";

interface SpiderChartProps {
  dataset: Entry[];
}

type SpiderChartData = { axis: string; value: number }[][];

const getSpiderChartData = (
  dataset: Entry[],
): { data: SpiderChartData; genres: string[] } => {
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

const createLegend = (
  currentRef: HTMLInputElement | null,
  colorScale: d3.ScaleOrdinal<string, string>,
) => {
  const legendContainer = d3.select(currentRef);

  legendContainer.select(".legend-container").remove();

  const legendDiv = legendContainer
    .append("div")
    .attr("class", "legend-container")
    .style("position", "absolute")
    .style("bottom", "40px")
    .style("left", "-100px")
    .style("background", "rgba(0, 0, 0, 0.4)")
    .style("padding", "10px")
    .style("border-radius", "5px");

  legendDiv.append("h2").text("Legend").style("color", "white").style("margin", "0 0 10px 0");

  const colorLegend = legendDiv
    .selectAll(".color-legend")
    .data(GENRES.slice(0, 5))
    .enter()
    .append("div")
    .attr("class", "color-legend")
    .style("display", "flex")
    .style("align-items", "center")
    .style("margin-bottom", "4px");
  colorLegend
    .append("svg")
    .attr("width", 10)
    .attr("height", 10)
    .style("margin-right", "5px")
    .append("circle")
    .attr("cx", 5)
    .attr("cy", 5)
    .attr("r", 4)
    .style("fill", (_d, i) => colorScale(i as unknown as string));

  colorLegend
    .append("span")
    .style("color", "white")
    .style("margin-left", "5px")
    .text((d) => d.name);
};

const SpiderChart: FC<SpiderChartProps> = ({ dataset }) => {
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const width =
    Math.min(700, window.innerWidth - 10) - margin.left - margin.right;
  const height = Math.min(
    width,
    window.innerHeight - margin.top - margin.bottom - 20,
  );

  const { data, genres } = getSpiderChartData(dataset);

  const ref = useRef<HTMLInputElement>(null);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1,
      levels: 5,
      roundStrokes: true,
      color: colorScale,
    };

    RadarChart(ref.current, data.slice(0, 5), radarChartOptions);
    createLegend(ref.current, colorScale);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
    </div>
  );
};

export default SpiderChart;
