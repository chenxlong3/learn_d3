d3.json("../../data/sol_2016.json")
.then(d => {
    const planets = [];
    d.planets.forEach(obj => {
        planets.push({
            name: obj.name,
            distance: obj.semiMajorAxisAU
        });
    });
    drawChart(planets);
});

function drawChart(distances) {
    // d3.select("body").append("ol")
    // .selectAll("li")
    // .data(distances)
    // .join("li")
    // .text(d => d.name + " (" + d.distance + " AU)")
    const barScale = d3.scaleLinear()
    .domain([0, d3.max(distances, d => d.distance)])
    .range([0, 600]);

    colorScale = d3.scaleLinear()
                       .domain([0, d3.max(distances, d => d.distance)])
                       .range([0,1])

    distances.sort((a,b) => d3.ascending(a.distance, b.distance));

    const svg = d3.select("body")
    .append("svg")
    .attr("class", "bar-chart")
    .style("height", distances.length*21);
    
    const entries = svg.selectAll("g").data(distances)
    .enter()
    .append("g")
    .attr("class", "entry")
    .attr("transform", (d, i) => `translate(0, ${i*21})`);
    
    entries.each(function(d) {
        const entry = d3.select(this); // the current entry

        entry.append("text").attr("class", "label category")
                .attr("y", 15)
                .attr("x", 90)
                .text(d.name);

        entry.append("rect").attr("class", "bar")
                .attr("x", 100)
                .style("width", barScale(d.distance) + "px")
                .style("fill", d3.color('orange')
                                 .darker(colorScale(d.distance)))

        entry.append("text").attr("class", "label value")
                .attr("y", 15)
                .attr("x", barScale(d.distance) + 105);})

}