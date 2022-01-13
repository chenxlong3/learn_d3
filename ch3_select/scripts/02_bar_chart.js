const distances = [
    {name: "Mercury", distance: 0.387},
    {name: "Venus", distance: 0.723},
    {name: "Earth", distance: 1},
    {name: "Mars", distance: 1.52},
    {name: "Jupiter", distance: 5.2},
    {name: "Saturn", distance: 9.54},
    {name: "Uranus", distance: 19.2},
    {name: "Neptune", distance: 30.1},
    {name: "Ceres", distance: 2.765},
    {name: "Pluto", distance: 39.481},
    {name: "Eris", distance: 67.67},
    {name: "Haumea", distance: 43},
    {name: "Makemake", distance: 45.346}
];
const barScale = d3.scaleLinear()
.domain([0, d3.max(distances, d => d.distance)])
.range([0, 600]);
const fmt = d3.format(".2f")

const colorScale = d3.scaleLinear()
.domain([0, d3.max(distances, d => d.distance)])
.range([0, 1])
// d3.select("body")
// .append("ul")
// .selectAll("li")
// .data(distances)
// .enter()
// .append("li")
// .text((d, i) => d.name+": "+d.distance)
const chart = d3.select("body")
.append("div")
.attr("class", "bar-chart")
.style("height", () => distances.length*21 + "px")

const entries = d3.selectAll("div")
.data(distances)
.enter()
.append("div")
.attr("class", "entry")
.style("top", (d, i) => i*21 + "px")
entries.append("div")
.attr("class", "label category")
.text(d => d.name)

entries.append("div").attr("class", "bar")
.style("width", d => barScale(d.distance) + "px")
.style("background-color", d => d3.color("orange").darker(colorScale(d.distance)))

entries.append("div").attr("class", "label value")
.style("left", d => (barScale(d.distance) + 100) + "px")
.text(d => fmt(d.distance) + " AU");
// d3.select("body")
// .append("svg")
// .attr("class", "bar-chart")
// .style("height", () => distances.length*21 + "px")
// .append("g")
// .selectAll("rect")
// .data(distances)
// .enter()
// .append("rect")
// .attr("class", "bar")
// .style("color", "orange")
// .style("y", (d, i) => i*21 + "px")
// .style("width", d => (d.distance * 10) + "px");

