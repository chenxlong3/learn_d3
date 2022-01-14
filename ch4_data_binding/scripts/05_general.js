// const datasets = ["one", "two", "three", "four"];
// const colors = ["red", "blue", "green", "purple"];
// let idx = 0;
const datasets = ["one", "two", "three", "four"];
const colors = ["red", "blue", "green", "purple"];
let idx = 0;

d3.select("form")
.selectAll("button")
.data(datasets)
.enter()
.append("button")
.attr("type", "button")
.attr("id", (d, i) => "b" + i)
.property("disabled", (d, i) => d == datasets[idx])
.style("background-color", (d, i) => colors[i])
.text(d => d.toUpperCase())
.on("click", function(event, d) {
    idx = d3.select(event.currentTarget).attr("id").substring(1);
    d3.selectAll("button")
    .property("disabled", t => t == datasets[idx]);
    redraw();
});

function redraw() {
    const selection = d3.select("#container")
    .selectAll("div.letter")
    .data(datasets[idx].split(''))
    .join("div")
    .attr("class", "letter")
    .style("background-color", d => colors[idx])
    .text(d => d);

    // selection.exit().remove();
    // selection.enter()
    // .append("div")
    // .merge(selection)
    // .attr("class", "letter")
    // .style("background-color", d => colors[idx])
    // .text(d => d)
}

draw();

function draw() {
    d3.select("#container")
    .selectAll(".letter")
    .data(datasets[idx].split('')).enter()
    .append("div")
    .attr("class", "letter")
    .style("background-color", d => colors[idx]).text(d => d);
}