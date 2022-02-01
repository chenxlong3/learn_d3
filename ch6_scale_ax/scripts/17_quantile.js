const sample = [0,8,19,25,65,98,120,170,320,440,800,910];
const colors = ['blue', 'green', 'red'];

const scaleBuckets = d3.scaleQuantile()
.domain(sample)
.range(colors);

const data = d3.range(0, 910, 16);

const axScale = d3.scaleIdentity()
.domain(d3.extent(data));
const axis = d3.axisBottom().scale(axScale);

d3.select("body")
.append("svg")
.attr("height", 650)
.attr("width", 1050)
.append("g")
.attr("transform", "translate(25, 25)")
.call(axis);

d3.select("svg")
.append("g")
.selectAll("ellipse")
.data(data)
.join("ellipse")
.attr("rx", 3)
.attr("ry", 6)
.attr("cx", d => d + 25)
.attr("cy", 25)
.style("fill", d => scaleBuckets(d));