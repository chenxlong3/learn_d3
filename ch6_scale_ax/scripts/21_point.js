const data = d3.range(0, 100, 2);
const pointScale = d3.scalePoint()
.domain(data)
.range([0, 800]);
const colorScale = d3.scaleSequential((d3.interpolateRainbow))
.domain([0, 100]);

const svg = d3.select("body")
.append("svg")
.attr("width", 850)
.attr("height", 200);

svg.append("g")
.selectAll("circle")
.data(data)
.join("circle")
.attr("cx", d => pointScale(d) + 20).attr("cy", 22)
.attr("r", 5)
.style("fill", d => colorScale(d));