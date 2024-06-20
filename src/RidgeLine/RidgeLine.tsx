import * as d3 from 'd3';

import React, { useEffect, useRef } from 'react';

import { Entry } from '../dataset';

interface RidgelinePlotProps {
    data: Entry[];
    selectedGenres: string[];
    kernelBandwidth: number;
    numTicks: number;
}

const RidgelinePlot: React.FC<RidgelinePlotProps> = ({ data, selectedGenres, kernelBandwidth, numTicks }) => {
    const chartRefs = useRef<(SVGSVGElement | null)[]>([]);
    const xAxisRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const margin = { top: 60, right: 30, bottom: 60, left: 110 },
            width = 800 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom; // Adjust height to fit multiple graphs

        const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

        // Draw the shared x-axis
        const xAxisSvg = d3
            .select(xAxisRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', margin.bottom)
            .html('') // Clear previous contents
            .append('g')
            .attr('transform', `translate(${margin.left}, 0)`);

        xAxisSvg.append("g")
            .attr("transform", `translate(0, 20)`)
            .call(d3.axisBottom(x));

        selectedGenres.forEach((genre, index) => {
            const svg = d3
                .select(chartRefs.current[index])
                .attr('width', width + margin.left + margin.right)
                .html('') // Clear previous contents
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const kde = kernelDensityEstimator(kernelEpanechnikov(kernelBandwidth), x.ticks(numTicks));
            const density = kde(data.filter((d) => d.track_genre === genre).map((d) => d.popularity * 100));

            // Create a Y scale for densities
            const y = d3.scaleLinear()
                .domain([0, .08])
                .range([height, 0]);

            // Add area
            svg.append("path")
                .datum(density)
                .attr("fill", "#ccc")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("d", d3.area()
                    .curve(d3.curveBasis)
                    .x(d => x(d[0]))
                    .y0(y(0))
                    .y1(d => y(d[1])));

            // Add title
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text(genre);

            function kernelDensityEstimator(kernel: (v: number) => number, X: number[]) {
                return function (V: number[]) {
                    return X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))] as [number, number]);
                };
            }

            function kernelEpanechnikov(k: number) {
                return function (v: number) {
                    return Math.abs((v /= k)) <= 1 ? 0.75 * (1 - v * v) / k : 0;
                };
            }
        });

    }, [data, selectedGenres, kernelBandwidth, numTicks]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {selectedGenres.map((genre, index) => (
                <svg key={genre} ref={el => chartRefs.current[index] = el}></svg>
            ))}
            <svg ref={xAxisRef}></svg>
        </div>
    );
};

export default RidgelinePlot;
