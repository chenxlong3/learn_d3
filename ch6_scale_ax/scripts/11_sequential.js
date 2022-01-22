const WIDTH = 1000, HEIGHT = 400, margin = 20;
const [a, b] = [-300, 150];
const interpolator = d3.interpolate(a, b);
const scale = d3.scaleSequential(interpolator)
.domain([a, b]);

const axisScale = d3.scaleLinear()
.domain([a, b])
.range([20, 500]);
const tickValues = scale
.ticks(10)
.map(d => scale(d));

const axis = d3.axisBottom()
.scale(axisScale)
.tickValues(tickValues);

d3.select("body")
.append("svg")
.attr("height", 50)
.attr("width", 550)
.append("g")
.attr("transform", "translate(25,25")
.call(axis);

