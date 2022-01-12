const div = d3.select("#section");
const domDiv = div.node();
const firstP = d3.select("p");
const allParagraphs = d3.selectAll("p");
const allPDom = allParagraphs.nodes();
const sectionParagraphs = d3.select("div").selectAll("p");
console.log(allPDom);
console.log(sectionParagraphs);