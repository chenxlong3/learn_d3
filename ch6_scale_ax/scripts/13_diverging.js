// import * as d3 from 'd3'

const [a, b] = [-300, 150];
const interpolator = d3.interpolate(a, b);

const scale = d3.scaleDiverging(interpolator)
.domain([a, 0, b]);

const axisScale = d3.scaleLinear()
.domain([a, b])
.range([0, 500]);

const tickValues = scale.ticks(10)
.map(d => scale(d));

const axis = d3.axisBottom()
.scale(axisScale)
.tickValues(tickValues);

d3.select("body")
.append("svg")
.attr("height", 50)
.attr("width", 550)
.append("g")
.attr("transform", "translate(25, 25)")
.call(axis);