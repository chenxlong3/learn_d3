const WIDTH = 1000, HEIGHT = 400, margin = 50;

const data = d3.range(-32, 33);
const scale = d3.scaleSymlog()
.domain([-32, 32])
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
.attr("cy", 20)