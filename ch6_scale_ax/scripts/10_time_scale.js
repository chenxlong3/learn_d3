const WIDTH = 1200, HEIGHT = 400, margin = 10;
const data = [
    new Date(2017, 10, 1),
    new Date(2017,11,26),
    new Date(2018, 3, 15)
];
const scale = d3.scaleTime()
.domain([new Date(2017, 9, 1), new Date(2018,9,1)])
.range([margin, WIDTH-margin-20]);

const xAxis = d3.axisBottom()
.scale(scale);

const svg = d3.select("body")
.append("svg")
.attr("width", WIDTH)
.attr("height", HEIGHT);

svg.append("g")
.attr("class", "x_ax")
.attr("transform",`translate(${margin}, ${margin})`)
.call(xAxis);

svg.append("g")
.selectAll("circle")
.data(data)
.join("circle")
.attr("r", 5)
.attr("fill", "red")
.attr("cx", d => scale(d))
.attr("cy", margin);

