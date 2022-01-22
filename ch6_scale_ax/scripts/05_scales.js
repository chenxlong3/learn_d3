const scaleA = d3.scaleLinear()
.domain([0, 1000])
.range([100, 500]);

const scaleB = d3.scaleLinear()
.domain([0, 1000])
.range([500, 100]);

const pixel1 = scaleA(250);
const pixel2 = scaleB(250);

console.log(scaleA.range());
console.log(pixel1);
console.log(pixel2);