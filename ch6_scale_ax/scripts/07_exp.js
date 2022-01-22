const WIDTH = 1005, HEIGHT = 800, margin = 5;
const data = d3.range(0, 33);
const scale = d3.scalePow()
.exponent(2)
.domain([0, 32])
.range([0, 1000]);


const svg = d3.select("body")
.append("svg")
.attr("height", HEIGHT)
.attr("width", WIDTH)
svg.selectAll("circle")
.data(data)
.join("circle")
.attr("r",5)
.attr("cx", d => scale(d))
.attr("cy", 20)
