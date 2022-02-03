const schemes = [
    {scheme: 'schemeCategory10', size: 10},
    {scheme: 'schemeAccent', size: 8},
    {scheme: 'schemeDark2', size: 8},
    {scheme: 'schemePaired', size: 12},
    {scheme: 'schemePastel1', size: 9},
    {scheme: 'schemePastel2', size: 8},
    {scheme: 'schemeSet1', size: 9},
    {scheme: 'schemeSet2', size: 8},
    {scheme: 'schemeSet3', size: 12},
];
schemes.forEach((scheme, index) => renderScheme(scheme, index))

function renderScheme(scheme, index) {
    const scale = d3.scaleOrdinal(d3[scheme.scheme]).domain([0, 600]);
    const g = d3.select("svg")
    .append("g")
    .attr("transform", `translate(25, ${index*25})`);

    g.selectAll("rect")
    .data(d3.range(0, scheme.size))
    .join("rect")
    .attr("height", 15).attr("width", 20)
    .attr("x", d => d*25 + 150).attr("y", 0)
    .style("fill", d => scale(d));

    g.append("text")
    .attr("x", 0).attr("y", 10)
    .text("d3." + scheme.scheme);


}