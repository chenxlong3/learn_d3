const scaleBuckets = d3.scaleQuantize()
.domain([0, 900])
.range(['blue', 'green', 'red']);

const data = [0,50,100,200,250,290,300,310,400,550,590,650,700,900];

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