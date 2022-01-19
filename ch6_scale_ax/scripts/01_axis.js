const scale = d3.scaleLinear()
.range([0, 250]);
// .domain([0, 10])

const axis1 = d3.axisBottom(scale).tickSize(25)
.ticks(5, ',%');
const axis2 = d3.axisTop(scale).tickSizeOuter(0)
.tickSizeInner(10)
.tickPadding(5);
const axis3 = d3.axisLeft(scale)
.ticks(20, ".3f");
const axis4 = d3.axisRight(scale);

const svg = d3.select("body")
.append("svg")
.attr("width", 500)
.attr("height", 350);

// svg.append("g").call(axis1);
// axis1(svg.append("g"));

svg.append("g").attr("transform", "translate(10, 100").call(axis1);
svg.append("g").attr("transform", "translate(10, 250)").call(axis2);
svg.append("g").attr("transform", "translate(350, 50)").call(axis3);
svg.append("g").attr("transform", "translate(400, 50)").call(axis4);

