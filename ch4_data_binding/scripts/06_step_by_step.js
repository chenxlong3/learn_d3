const app = {
    planets: []
}

const current = {
    moons: [],
    id: undefined,
    planet: {},
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
    .attr("transform", `translate(${[MARGIN_PLANET, HEIGHT / 2]})`);

d3.json("../../data/sol_2016.json")
    .then(function (data) {
        app.planets = data.planets.filter(p => +p.id.substring(1) >= 3 && +p.id.substring(1) <= 8);
        configureView();
        draw();
    })

function configureView() {
    current.planet = app.planets.filter(p => p.id == current.id)[0];
    const maxDiameter = d3.max(current.planet.satellites, d => d.diameterKm);
    current.moons = current.planet.satellites.filter(s => s.diameterKm > maxDiameter / 50);

    const sumDiameters = d3.sum(current.moons, d => d.diameterKm);

    const horizSpace = WIDTH - (MARGIN_PLANET + MARGIN_W * 2 + current.moons.length * MARGIN_MOON);
    const vertSpace = HEIGHT - MARGIN_H * 2;

    scale.range([0, d3.min([vertSpace, horizSpace])]).domain([0, sumDiameters]);

    console.log("Planet", current.planet);
    console.log("Largest moon diameter", maxDiameter);
    console.log("Selected moons", current.moons);
}

function draw() {
    plane.append("line")
        .attr("x1", 0)
        .attr("x2", WIDTH)
        .style("stroke", "red");

    plane.append("circle")
        .attr("class", "planet")
        .datum(current.planet)
        .attr("r", d => scale(d.diameterKm) / 2)
        .attr("cx", d => -(MARGIN_W + scale(d.diameterKm) / 2));
}