const app = {
    planets: []
}

const current = {
    moons: [],
    id: undefined,
    planets: {},
    color: "black"
}
current.id = "p5";
const scale = d3.scaleLinear();

const WIDTH = 500, HEIGHT = 300;
const MARGIN_W = 20, MARGIN_H = 50;
const MARGIN_MOON = 10;
const MARGIN_PLANET = 100;

const svg = d3.select("#moons")
.attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

const plane = svg.append("g")
.attr("transform", `translate(${[MARGIN_PLANET, HEIGHT/2]})`);

d3.json("../../data/sol_2016.json")
.then(function(data) {
    app.planets = data.planets.filter(p => +p.id.substring(1) >= 3 && +p.id.substring(1) <= 8);
    configureView();
    draw();
})

function configureView() {
    console.log(app.planets);
}

function draw() {}