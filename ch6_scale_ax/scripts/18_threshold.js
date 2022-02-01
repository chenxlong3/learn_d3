const speeds = [0,119,154,178,209,252,310];
const categories = [0, 1, 2, 3, 4, 5];
const colors = ['#62b6e6','blue','green','gold','orange','red'];

const scaleHurricane = d3.scaleThreshold()
.domain(speeds)
.range(categories);

const scaleColor = d3.scaleOrdinal()
.domain(scaleHurricane.range())
.range(colors);

const scaleX = d3.scaleLinear()
.domain(d3.extent(speeds))
.range([0, 1000]);

const axisX = d3.axisBottom().scale(scaleX);

d3.select("body")
.append("svg")
.attr("height", 650)
.attr("width", 1050)
.append("g")
.attr("transform", "translate(25, 575)")
.call(axisX)
.append("text")
.text("Maximum wind speed in km/h")
.attr("y", 40)
.attr("x", 500)
.style("fill", "black");

const storms = [
    {name: 'Arlene', maxSpeed: 110},
    {name: 'Bret', maxSpeed: 65},
    {name: 'Cindy', maxSpeed: 120},
    {name: 'Dennis', maxSpeed: 240},
    {name: 'Emily', maxSpeed: 260},
    {name: 'Franklin', maxSpeed: 110},
    {name: 'Gert', maxSpeed: 75},
    {name: 'Harvey', maxSpeed: 100},
    {name: 'Irene', maxSpeed: 165},
    {name: 'Jose', maxSpeed: 95},
    {name: 'Katrina', maxSpeed: 280},
    {name: 'Lee', maxSpeed: 65},
    {name: 'Maria', maxSpeed: 185},
    {name: 'Nate', maxSpeed: 150},
    {name: 'Ophelia', maxSpeed: 140},
    {name: 'Philippe', maxSpeed: 130},
    {name: 'Rita', maxSpeed: 285},
    {name: 'Stan', maxSpeed: 130},
    {name: 'Tammy', maxSpeed: 85},
    {name: 'Vince', maxSpeed: 120},
    {name: 'Wilma', maxSpeed: 295}
];

const scaleY = d3.scaleLinear()
.domain([0, storms.length])
.range([0, 550]);
const axisY = d3.axisRight()
.scale(scaleY)
.tickSize(1000).ticks(20, 's').tickFormat(d => '');

d3.select("svg")
.append("g").attr("transform", "translate(25, 20)")
.call(axisY)
.style("stroke-width", 13)
.style("opacity", .1)
.select('.domain').remove();

d3.select("svg")
.append("g")
.selectAll("text")
.data(storms)
.join("text")
.text(d => d.name)
.attr("x", d => scaleX(d.maxSpeed) + 25)
.attr("y", (d, i) => 50 + i*25)
.style("fill", d => scaleColor(scaleHurricane(d.maxSpeed)));