const WIDTH = 800, HEIGHT = 600, margin = 150;

const angularData = d3.range(0, 12, 1);
const radialData = d3.range(0, 101, 10);

const scaleRadius = d3.scaleLinear()
.domain(d3.extent(radialData))
.range([0, WIDTH/2 - margin]);

const axis = d3.axisBottom(scaleRadius)
.ticks(10)
.tickSize(0)
.tickPadding(0)
.tickSizeOuter(0);

const svg = d3.select("body").append("svg")
.attr("height", HEIGHT)
.attr("width", WIDTH);

const g = svg.append("g")
.attr("transform", `translate(${[WIDTH/2, HEIGHT/2]}) rotate(-90)`);

g.selectAll("circle.grid")
.data(radialData)
.join("circle")
.attr("class", "grid")
.attr("r", scaleRadius);

g.selectAll("g.axis")
.data(angularData)
.join("g").attr("class", "axis")
.classed("blank", (d, i) => i != 0)
.call(axis)
.attr("transform", (d, i) => `rotate(${i*360/12})`);

// moves tick lines to center of domain
d3.selectAll(".tick line").attr("y1", -3)
.attr("y2", 4);

// backdrop
d3.select(".axis")
.selectAll(".tick")
.insert("rect", ".tick text")
.attr("x", -8)
.attr("width", 16)
.attr("height", 16);

// moves tick lines to center of domain
d3.selectAll(".tick text")
.attr("transform", "rotate(90)")

d3.selectAll(".tick rect")
.attr("y", -8);

