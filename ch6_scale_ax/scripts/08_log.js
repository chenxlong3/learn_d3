const WIDTH = 1000, HEIGHT = 400, margin = 20;
const data = d3.range(1, 33);
const scale = d3.scaleLog()
.base(10)
.domain([1, 32])
.range([margin, WIDTH - margin]);

const svg = d3.select("body")
.append("svg")
.attr("width", WIDTH)
.attr("height", HEIGHT);

svg.append("g")
.selectAll("circle")
.data(data)
.join("circle")
.attr("r", 5)
.attr("cx", d => scale(d))
.attr("cy", 20);