const schemes = [
    'schemeBrBG',
    'schemePRGn',
    'schemePiYG',
    'schemePuOr',
    'schemeRdBu',
    'schemeRdGy',
    'schemeRdYlBu',
    'schemeRdYlGn',
    'schemeSpectral'
];
const size = 11;

schemes.forEach((scheme, index) => renderScheme(scheme, index));

function renderScheme(scheme, index) {
    const scale = d3.scaleOrdinal(d3[scheme][size]);
    const g = d3.select("svg")
    .append("g")
    .attr("transform", `translate(25, ${25*index})`);

    g.selectAll("rect")
    .data(d3.range(0, size))
    .join("rect")
    .attr("width", 20).attr("height", 15)
    .attr("x", d => d*25 + 180).attr("y", 0)
    .style("fill", d => scale(d));

    g.append("text")
    .attr("x", 0).attr("y", 15)
    .text("d3." + scheme + `[${size}]`);
}