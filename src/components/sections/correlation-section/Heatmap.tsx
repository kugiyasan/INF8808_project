import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Entry } from "../../../dataset";

interface HeatmapProps {
  dataset: Entry[];
  genresSelected: string[];
}

type HeatmapData = { axis: string; correlation: number }[][];

const getHeatmapCorrelation = (
  dataset: Entry[],
  genresSelected: string[],
): { data: HeatmapData; genres: string[] } => {
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

  const data: HeatmapData = [];
  const genres: string[] = [];

  for (const genre of genresSelected) {
    const group = groupByGenre[genre];
    if (!group) continue;

    const entry: { axis: string; correlation: number }[] = [];

    const popularityValues = group.map((row) => Number(row.popularity));
    const meanPopularity = d3.mean(popularityValues)!;
    const stdDevPopularity = d3.deviation(popularityValues)!;

    for (const label of spokeLabels) {
      if (label === "popularity") {
        continue;
      }

      const featureValues = group.map((row) => Number(row[label]));
      const meanFeature = d3.mean(featureValues)!;
      const stdDevFeature = d3.deviation(featureValues)!;

      const covariance = d3.mean(
        popularityValues.map(
          (popularity, i) =>
            (popularity - meanPopularity) * (featureValues[i] - meanFeature),
        ),
      )!;
      const correlation =
        stdDevPopularity && stdDevFeature
          ? covariance / (stdDevPopularity * stdDevFeature)
          : 0;

      entry.push({ axis: label, correlation: correlation });
    }

    data.push(entry);
    genres.push(genre);
  }

  return { data, genres };
};

const CorrelationHeatmap: FC<HeatmapProps> = ({ dataset, genresSelected }) => {
  const { data, genres } = getHeatmapCorrelation(dataset, genresSelected);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!data.length || !data[0]) return;

    const margin = { top: 50, right: 50, bottom: 50, left: 50 }; // Adjusted margins
    const width =
      Math.min(1300, window.innerWidth - 10) - margin.left - margin.right; // Increased width
    const height = Math.min(
      500,
      window.innerHeight - margin.top - margin.bottom - 20,
    ); // Adjusted height to match increased width

    d3.select(ref.current).selectAll("*").remove();
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(genres)
      .padding(0.01);

    const yScale = d3
      .scaleBand()
      .range([height, 0])
      .domain(data[0].map((d) => d.axis))
      .padding(0.01);

    const colorScale = d3
      .scaleSequential(d3.interpolateInferno)
      .domain([-1, 1]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .select(".domain")
      .remove();

    svg
      .append("g")
      .call(d3.axisLeft(yScale).tickSize(0))
      .select(".domain")
      .remove();

    const flattenedData = genres.flatMap((genre, i) =>
      data[i].map((d) => ({ genre, axis: d.axis, value: d.correlation })),
    );

    svg
      .selectAll(".rect")
      .data(flattenedData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.genre)!)
      .attr("y", (d) => yScale(d.axis)!)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", (d) => colorScale(d.value))
      .style("stroke-width", 4)
      .style("stroke", "none");

    createLegend();
  }, [data, genres]);

  const createLegend = () => {
    const legendContainer = d3.select(ref.current);
    if (legendContainer.select("h2").empty()) {
      legendContainer.append("h2").text("Legend of the correlation");
    }

    // TODO: add the legend
  };

  return <div ref={ref}></div>;
};

export default CorrelationHeatmap;
