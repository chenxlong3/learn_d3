const HEIGHT = 500, WIDTH = 800, MARGIN_X = 50, MARGIN_Y = 50;

const scaleX = d3.scaleLinear().range([MARGIN_X, WIDTH - MARGIN_X]),
scaleY = d3.scaleLinear().range([HEIGHT - MARGIN_Y, MARGIN_Y]);

const axisX = d3.axisBottom(scaleX)
.tickSize(HEIGHT - MARGIN_Y*2)
.tickPadding(5)
.tickSizeOuter(5)

const axisY = d3.axisLeft(scaleY)
.tickSize(WIDTH - MARGIN_X*2)
.tickPadding(5)
.tickSizeOuter(5);

const svg = d3.select("body").append("svg")
.attr("width", WIDTH)
.attr("height", HEIGHT);

x_ax = svg.append("g")
.attr("class", "x_axis")
.attr("transform", `translate(0, ${MARGIN_Y})`)
.call(axisX);

y_ax = svg.append("g")
.attr("class", "y_axis")
.attr("transform", `translate(${WIDTH - MARGIN_X}, 0)`)
.call(axisY);

d3.select(".y_axis .domain")
.attr("transform", `translate(${-WIDTH + MARGIN_X*2}, 0)`);

d3.select(".x_axis .domain")
.attr("transform", `translate(0, ${HEIGHT - MARGIN_Y})`);