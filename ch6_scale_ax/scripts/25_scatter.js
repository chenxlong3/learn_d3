const w = 500, h = 300, marginH = 40, marginW = 50;

const xScale = d3.scaleLinear().range([marginW, w - marginW]);
// const yScale = d3.scaleLinear().range([h-marginH, marginH]);
const yScale = d3.scaleLog().range([h-marginH, marginH]);
const colorScale = d3.scaleOrdinal(d3.schemeDark2);
const scaleR = d3.scaleSqrt().range([1, 15])

const xAxis = d3.axisBottom().scale(xScale)
.tickSize(h - marginH*2 + 10)
.tickPadding(2);
const yAxis = d3.axisLeft().scale(yScale).ticks(10, "d")
.tickSize(w - marginW*2 + 10)
.tickPadding(2);

const format = d3.format("$,.0f");
const formatSI = d3.format(",.3s")

const data = {continents: new Set()};

d3.csv("../../data/un_region_gdp.csv", function(row) {
    if(row.HDI_2017>0 && row.GDP_2017 > 0) {
        data.continents.add(row.Continent);
        return {
            name: row.Country,
            code: row.Code,
            continent: row.Continent,
            population: +row.Pop_2016,
            hdi: +row.HDI_2017,
            gdp: +row.GDP_2017
        }
    }
})
.then(dataset => {
    // console.log(data);
    data.continents = [...data.continents].sort((a, b) => d3.ascending(a, b));
    data.countries = dataset;
    xScale.domain(d3.extent(dataset, d => d.hdi));
    yScale.domain(d3.extent(dataset, d => d.gdp));
    scaleR.domain(d3.extent(dataset, d => d.population));
    drawAxes();
    draw();
    drawTooltips();
    
})

function drawAxes() {
    const xG = d3.select("svg")
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${h-marginH})`)
    .call(xAxis);

    const yG = d3.select("svg")
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${marginW}, 0)`)
    .call(yAxis);

    xG.attr("transform", `translate(0, ${marginH})`);
    yG.attr("transform", `translate(${w-marginW}, 0)`);

    d3.select("svg")
    .append("text")
    .attr("class", "label")
    .text("Human Development Index (HDI)")
    .attr("transform", `translate(${w/2}, ${h-3})`);

    d3.select("svg")
    .append("text")
    .attr("class", "label")
    .text("Annual GDP per capita (USD)")
    .attr("transform", `translate(10, ${h/2}) rotate(-90)`);

    // d3.select(".domain")
    // .remove();
}

function draw() {
    d3.select("svg").selectAll("circle.dot")
    .data(data.countries)
    .join("circle").attr("class", "dot")
    .attr("r", d => scaleR(d.population))
    .attr("cx", d => xScale(d.hdi)).attr("cy", d => yScale(d.gdp))
    .attr("opacity", 0.8);

    d3.selectAll(".dot")
    .style("fill", d => colorScale(d.continent))

    const legend = d3.select("svg")
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(85, 50)");
    legend.selectAll("g.item")
    .data(data.continents)
    .join("g")
    .attr("class", "item")
    .each(function(d, i) {
        d3.select(this)
        .append("rect")
        .attr("y", i*10)
        .attr("height", 8)
        .attr("width", 20)
        .style("fill", colorScale(d));

        d3.select(this)
        .append("text")
        .attr("y", i*10)
        .attr("x", 24)
        .text(d);
    });

    legend.selectAll(".item")
    .on("mouseenter", showContinents)
    .on("mouseleave", clearContinents);
}

function drawTooltips() {
    const tooltip = d3.select("svg")
    .append("g")
    .attr("class", "tooltip")
    .attr("opacity", 0)
    .style("pointer-events", "none");

    tooltip.append("rect")
    .attr("width", 80)
    .attr("height", 45)
    .attr("rx", 3).attr("ry", 3)
    .attr("x", -3).attr("y", -10);

    tooltip.append("text").attr("class", "name");
    tooltip.append("text").attr("class", "hdi").attr("y", 15);
    tooltip.append("text").attr("class", "gdp").attr("y", 30);
    tooltip.append("text").attr("class", "pop").attr("y", 45);

    d3.select("svg").selectAll("circle.dot")
    .on("mouseenter", showDetails)
    .on("mouseleave", clearDetails)

}

function showDetails(event, d) {
    d3.select(this).attr("r", scaleR(d.population)*1.2);
    d3.select(".tooltip").attr("opacity", 1)
    .attr("transform", `translate(${10+xScale(d.hdi)}, ${yScale(d.gdp) - 12})`);

    const text1 = d3.select(".tooltip .name").text(d.name);
    const text2 = d3.select(".tooltip .gdp").text("GDP: " + format(d.gdp));
    const text3 = d3.select(".tooltip .hdi").text("HDI: " + d.hdi);
    const text4 = d3.select(".tooltip .pop").text("Population: " + formatSI(d.population));

    const boxWidth = 6 + d3.max([
        text1.node().getComputedTextLength(),
        text2.node().getComputedTextLength(),
        text3.node().getComputedTextLength(),
        text4.node().getComputedTextLength()
    ])
    d3.select(".tooltip rect").attr("width", boxWidth)
    .attr("height", 60);
}

function clearDetails(event, d) {
    d3.select(this).attr("r", scaleR(d.population));
    d3.select(".tooltip").attr("opacity", 0)
}

function showContinents(event, d) {
    d3.selectAll(".item").classed("fade", k => k!=d);
    d3.selectAll(".dot").classed("show", k => k.continent == d);
}

function clearContinents(event, d) {
    d3.selectAll(".item").classed("fade", false);
    d3.selectAll(".dot").classed("show", false);
}