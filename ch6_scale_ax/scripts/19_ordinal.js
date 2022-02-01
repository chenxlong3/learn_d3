const data = d3.range(0, 10.1, 0.25);

const colorScale = d3.scaleOrdinal()
.domain(data)
.range(['#000','#00d','#d00','#0a0']);

const sizeScale = d3.scaleOrdinal()
.domain(data)
.range([12, 8, 10, 8]);

const boldScale = d3.scaleOrdinal()
.domain(data)
.range(['bold', 'normal']);

colorScale.unknown('gray');
sizeScale.unknown('16');
boldScale.unknown('bold');

const axisScale = d3.scaleLinear()
            .domain(d3.extent(data))
            .range([0,800]);

const svg = d3.select("body")
.append("svg")
.attr("width", 850)
.attr("height", 650);

svg.append("g")
.selectAll("text")
.data(data)
.join("text")
.attr("x", d => axisScale(d)).attr("y", 22)
.style("font-weight", d => boldScale(d))
.style("font-size", d => sizeScale(d))
.style("fill", d => colorScale(d))
.text(d => d);