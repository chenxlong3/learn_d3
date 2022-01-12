const div = d3.select("#section");
const domDiv = div.node();
const firstP = d3.select("p");
const allParagraphs = d3.selectAll("p");
const allPDom = allParagraphs.nodes();
const sectionParagraphs = d3.select("div").selectAll("p");
// console.log(allPDom);
// console.log(sectionParagraphs);
div.style("border", "solid blue 2px");
firstP.classed("big", true).text("This is paragraph");

allParagraphs.style("font-weight", "bold");

d3.select(".big")
    .attr("title", "Tooltip")
    .style("font-variant", "small-caps")
    .html("This is a <b>bold</b> paragraph.");