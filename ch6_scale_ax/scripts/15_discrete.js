// import * as d3 from 'd3'

const testData = d3.range(-10, 11);
const scale = d3.scaleOrdinal()
.domain(d3.extent(testData))
.range([-100, 100, 400]);

console.log(testData);
testData.forEach(d => {
    console.log(scale(d));
})