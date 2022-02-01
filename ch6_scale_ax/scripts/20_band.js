const data = d3.range(0, 100, 5);
const bandScale = d3.scaleBand()
.domain(data)
.range([0, 800])
.padding(.1);
const colorScale = d3.scaleSequential(d3.interpolatePlasma)
.domain([0, 200]);

const svg = d3.select("body")
.append("svg")
.attr("width", 800)
.attr("height", 400);

svg.append("g")
.selectAll("rect")
.data(data)
.join("rect")
.attr("x", d => bandScale(d))
.attr("y", 22)
.attr("width", d => bandScale.bandwidth())
.attr("height", d => Math.random()*200)
.attr("fill", (d, i, n) => {
    console.log(n);
    return colorScale(d3.select(n[i]).attr("height"))
})