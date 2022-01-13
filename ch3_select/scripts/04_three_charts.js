const charts = [
    {key: "avg", title: "Average", color: "orange"},
    {key: "max", title: "Maximum", color: "blue"},
    {key: "min", title: "Minimum", color: "red"}
]

const chart = {
    width: 1060,
    height: 0,
    current: charts[0]
}

const barScale = d3.scaleLinear().range([0, 800]);
const colorScale = d3.scaleLinear().range([0, 1]);
const format = d3.format(".2f");

const svg = d3.select("svg.bar-chart");
const planets = [];
d3.json("../Data/sol_2016.json").then(function(data) {
    data.planets.forEach(function(obj) {
        planets.push({
            name: obj.name,
            avg: obj.semiMajorAxisAU,
            max: obj.apheliumAU,
            min: obj.periheliumAU});
    });
    init();
});

function setupView() {
    d3.selectAll("button").property("disabled", false);
    d3.select("#" + chart.current.key).property("disabled", true);
    planets.sort((a,b) => d3.ascending(a[chart.current.key], b[chart.current.key]));

    const maxValue = d3.max(planets, d => d[chart.current.key]);
    barScale.domain([0, maxValue]);
    colorScale.domain([0, maxValue]);
}

function init() {
    chart.height = planets.length * 35;
    svg.attr("width", chart.width)
    .attr("height", chart.height);

    setupView();
    svg.selectAll("g").data(planets)
    .enter()
    .append("g")
    .attr("class", "entry")
    .attr("transform", (d, i) => `translate(0, ${i * 35})`)
    .each(function(d) {
        const entry = d3.select(this);
        entry.append("text")
        .attr("class", "label category")
        .attr("y", 15)
        .attr("x", 50)
        .text(d.name);

        entry.append("rect")
        .attr("class", "bar")
        .attr("x", 100)
        .attr("height", 33)
        .attr("width", barScale(d[chart.current.key]))
        .style("fill", d3.color(chart.current.color)
        .darker(colorScale(d[chart.current.key])));

        entry.append("text")
        .attr("class", "label value")
        .attr("x", barScale(d[chart.current.key]) + 105)
        .attr("y", 15)
        .text(format(d[chart.current.key]) + " AU");
        
    });
    d3.selectAll("button")
    .on("click", function() {
        chart.current = charts.filter(c => c.key == this.id)[0];
        d3.select("#chart")
        .text(chart.current.title)
        draw();
    })
}

function draw() {
    // console.log(chart.current.key);
    setupView();
    svg.selectAll("g.entry")
    .data(planets)
    .each(function (d, i) {
        d3.select(this).select(".label.category")
        .text(d.name);
        d3.select(this).select(".bar")
        .transition()
        .delay(20 * i)
        .attr("width", barScale(d[chart.current.key]))
        .style("fill", d3.color(chart.current.color).darker(colorScale(d[chart.current.key])));

        d3.select(this).select(".label.value")
        .transition()
        .delay(20 * i)
        .attr("x", barScale(d[chart.current.key]) + 105)
        .text(format(d[chart.current.key]) + " AU");
    })
}