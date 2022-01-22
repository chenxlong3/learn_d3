const HEIGHT = 500, WIDTH = 800, MARGIN_X = 50, MARGIN_Y = 50;

const scaleX = d3.scaleLinear()
.range([MARGIN_X, WIDTH - MARGIN_X]),
scaleY = d3.scaleLinear().range([HEIGHT - MARGIN_Y, MARGIN_Y]);

const axisX = d3.axisBottom(scaleX),
axisY = d3.axisLeft(scaleY);

const svg = d3.select("body")
.append("svg")
.attr("width", WIDTH)
.attr("height", HEIGHT);

const xG = svg.append("g")
.attr("class", "x_axis")
.call(axisX)
.attr("transform", `translate(0, ${HEIGHT - MARGIN_Y})`);

const yG = svg.append("g")
.attr("class", "y_axis")
.call(axisY)
.attr("transform", `translate(${MARGIN_X}, 0)`);

xG.append("text")
.attr("class", "label")
.attr("text-anchor", "middle")
.text("x values")
.style("fill", "black")
.attr("transform", `translate(${WIDTH/2}, ${MARGIN_Y - 10})`);

yG.append("text")
.attr("class", "label")
.attr("text-anchor", "middle")
.text("y values")
.style("fill", "black")
.attr("transform", `translate(${-MARGIN_X+10}, ${HEIGHT/2}) rotate(-90)`);

