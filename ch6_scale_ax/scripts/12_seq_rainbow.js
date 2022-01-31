// SequentialPow not working?
const scale = d3.scaleSequential(d3.interpolateRainbow)
.domain([0, 600]);
const svg = d3.select("body")
.append("svg")
.attr("height", 50)
.attr("width", 650)

d3.select("svg")
.selectAll("rect")
.data(d3.range(0, 601, 5))
.join("rect")
.attr("height", 20)
.attr("width", 4)
.attr("y", 0)
.attr("x", d => d)
.style("fill", d => scale(d));