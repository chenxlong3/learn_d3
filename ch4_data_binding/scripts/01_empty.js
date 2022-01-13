const selection = d3.selectAll("p");
// console.log(selection);

const nodelist = selection.nodes();
console.log(nodelist);
console.log(nodelist[2]);
console.log(nodelist[2].innerText);
const pInDiv = d3.select("div")
.selectAll("p")

const pInDiv2 = d3.selectAll("div#words p")
// console.log(pInDiv);
// console.log(pInDiv2);
const selection2 = d3.select("#words")
.selectAll("p")
.data([7, 4, 8])
.filter(function(d, i, nodes) {
    console.log(d, i, nodes, this);
    return true;
});