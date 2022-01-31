// import * as d3 from 'd3'
const margin = 20;

const data = d3.range(-300, 300, 10);

const xScale = d3.scaleLinear()
.domain([-300, 300])
.range([0, 600]);

const scale = d3.scaleDiverging(d3.interpolateBrBG)
.domain([-300, 0, 300]);

const svg = d3.select("body")
.append("svg")
.attr("width", 600 + margin)
.attr("height", 100 + margin);

const g = svg.selectAll(".rects")
.data(data)
.join("g")
.attr("class", "rects");

g
.append("rect")
.attr("width", 5)
.attr("height", 50)
.attr("padding-right", 5)
.attr("x", d => xScale(d))
.attr("fill", d => scale(d));