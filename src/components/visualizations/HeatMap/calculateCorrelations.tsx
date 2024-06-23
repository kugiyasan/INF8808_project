import * as d3 from "d3";
import { Entry } from "../../../dataset";
import { FACTORS } from "../../sections/heatmap-section/heatmap-section";

export const calculateCorrelations = (data: Entry[]) => {
  const factors = FACTORS.map((factor) => factor.name) as (keyof Entry)[];
  const correlations = [];
  for (const factor1 of factors) {
    for (const factor2 of factors) {
      const correlation = calculateCorrelation(
        data.map((d) => d[factor1]) as number[],
        data.map((d) => d[factor2]) as number[],
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
