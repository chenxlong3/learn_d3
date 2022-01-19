const app = {
    data: {}
}
const rawData = d3.csv("../../data/rain_sao_paulo.csv")
.then(function(data) {
    const monthGroup = d3.group(data, d => +d.Month, d => +d.Year)
    const rollUpData = d3.rollup(data, v => v.map(d => d.Rain_mm)[0], d => +d.Month, d => +d.Year);
    // console.log(...rollUpData);
    app.data = [...rollUpData];
    buildTable();
})

function buildTable() {
    const table = d3.select("table");
    const tr = table.selectAll("tr.month")
    .data(app.data)
    .enter()
    .append("tr").attr("class", "month")
    .attr("title", d => d.key);

    tr.selectAll("td.year")
    .data(d => {
        // console.log(d.values());
        return Array.from(d.values())
    })
    .enter()
    .append("td").attr("class", "year")
    .attr("title", d => d.key)
    .text((d, i) => {
        console.log(d);
        return d.value
    });
}