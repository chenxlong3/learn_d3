const data = d3.range(0, 33);
const scale = d3.scaleLinear()
.domain([0, 32])
.range([5, 1005]);

const svg = d3.select("body").append("svg")
.attr("width", 1010);

const svg2 = d3.select("body")
.append("svg")
.attr("width", 1010);

svg
.selectAll("circle")
.data(data)
.join("circle")
.attr("r",5)
.attr("cx", d => scale(d))
.attr("cy", 25);

const data2 = d3.range(-33, 33);
const scale2 = d3.scaleLinear()
.domain([-32, 5, 32])
.range([0, 300, 1000]);

svg2.selectAll("circle")
.data(data2)
.join("circle")
.attr("r", 5)
.attr("cx", d => scale2(d))
.attr("cy", 25);