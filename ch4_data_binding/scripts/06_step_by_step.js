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
        init();
        configureView();
        draw();
    })

function init() {
    d3.select("form")
        .data(app.planets)
        .enter()
        .append("button")
        .attr("type", "button")
        .attr("id", d => d.id)
        .text(d => d.name)
        .on("click", function (d) {
            current.id = d.id;
            configureView();
            draw();
        });
    plane.append("circle")
        .attr("class", "planet");
}

function configureView() {
    current.planet = app.planets.filter(p => p.id == current.id)[0];
    const maxDiameter = d3.max(current.planet.satellites, d => d.diameterKm);
    current.moons = current.planet.satellites.filter(s => s.diameterKm > maxDiameter / 50);

    current.moons.sort((a, b) => d3.descending(a.diameterKm, b.diameterKm));
    const sumDiameters = d3.sum(current.moons, d => d.diameterKm);

    const horizSpace = WIDTH - (MARGIN_PLANET + MARGIN_W * 2 + current.moons.length * MARGIN_MOON);
    const vertSpace = HEIGHT - MARGIN_H * 2;

    scale.range([0, d3.min([vertSpace, horizSpace])]).domain([0, sumDiameters]);

    console.log("Planet", current.planet);
    console.log("Largest moon diameter", maxDiameter);
    console.log("Selected moons", current.moons);
    d3.selectAll("button").property("disabled", false);
    d3.select("button#" + current.id).property("disabled", true);
}

function draw() {
    plane.append("line")
        .attr("x1", 0)
        .attr("x2", WIDTH)
        .style("stroke", "red");

    plane.select(".planet")
        .datum(current.planet)
        .attr("r", d => scale(d.diameterKm) / 2)
        .attr("cx", d => -(MARGIN_W + scale(d.diameterKm) / 2));
    d3.select("#planetName").text(() => current.planet.name);

    current.moons.forEach(function (moon, i) {
        let space = 0;
        if (i > 0) {
            let previous = current.moons[i - 1];
            space = previous.cx + scale(previous.diameterKm) / 2 + MARGIN_MOON;
        }
        moon.cx = space + scale(moon.diameterKm) / 2;
        console.log(moon.name, moon.cx);
    })

    plane.selectAll("circle.moon")
        .data(current.moons)
        .enter()
        .append("circle")
        .attr("class", "moon")
        .attr("cx", d => d.cx)
        .attr("r", d => scale(d.diameterKm) / 2);

    const moons = plane.selectAll("g.moon")
        .data(current.moons)
        .enter()
        .append("g")
        .attr("class", "moon")
        .attr("transform", d => `translate(${[d.cx, 0]})`)
        .each(function () {
            const moon = d3.select(this);
            moon.append("circle")
                .attr("r", d => scale(d.diameterKm) / 2);
            moon.append("text")
                .text(d => d.name)
                .attr("transform", function (d) {
                    const x = scale(d.diameterKm / 2) + MARGIN_MOON;
                    const y = this.getBBox().height / 4;
                    return `rotate(-90) translate(${[x, y]})`;
                });
        })



}