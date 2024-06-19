import * as d3 from "d3";
import RadarChart from "./RadarChart";
import { FC, useEffect, useRef } from "react";
import { Entry } from "../dataset";

interface SpiderChartProps {
  dataset: Entry[];
}

type SpiderChartData = { axis: string; value: number }[][];

const getSpiderChartData = (dataset: Entry[]): SpiderChartData => {
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

  for (const group of Object.values(groupByGenre)) {
    const entry = [];
    for (const label of spokeLabels) {
      const mean = d3.mean(group.map((row) => Number(row[label])));
      entry.push({ axis: label, value: mean! });
    }

    data.push(entry);
  }

  return data;
};

const SpiderChart: FC<SpiderChartProps> = ({ dataset }) => {
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const width =
    Math.min(700, window.innerWidth - 10) - margin.left - margin.right;
  const height = Math.min(
    width,
    window.innerHeight - margin.top - margin.bottom - 20,
  );

  const data = getSpiderChartData(dataset);

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
  });

  return <div ref={ref}></div>;
};

export default SpiderChart;
