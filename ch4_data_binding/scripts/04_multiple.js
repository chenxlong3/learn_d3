const width=800, height=600;
const data = [
    {color: "red", x: 200, y: 150},
    {color: "green", x:400, y: 300},
    {color: "blue", x: 600, y: 450}
];
const shapeStyles = {
    fill: d => d.color,
    stroke: "black",
    "stroke-width": () => Math.ceil(Math.random() * 5),
    "fill-opacity": 0.5,
    "stroke-opacity": 1
};

const circleData = {
    cx: d => d.x,
    cy: d => d.y,
    r: 50
};

const rectData = {
    x: d => width - 50 - d.x,
    y: d => height - 50 - d.y,
    width: 100,
    height: 100
};

d3.select("svg")
.selectAll("circle")
.data(data).enter()
.append("circle")
.styles(shapeStyles)
.attrs(circleData);

d3.select("svg")
.selectAll("rect")
.data(data).enter()
.append("rect")
.styles(shapeStyles)
.attrs(rectData);