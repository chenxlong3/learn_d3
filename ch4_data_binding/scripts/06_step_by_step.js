const app = {
    planets: [], // data will be loaded
    colors: ['#4169e1', '#cc8530', '#d4a450', '#dab520', '7fffd4', '1e90ff']
}

let current = {
    moons: [], //moons to be displayed
    id: undefined, // key to select current object
    planet: {}, // the object used in the current view
    color: "black" // color
}

current.id = "p5";

// scale the diameters in km to pixels
const scale = d3.scaleLinear();

const WIDTH = 500, HEIGHT = 300;
const MARGIN_W = 20, MARGIN_H = 50;
const MARGIN_MOON = 10;
const MARGIN_PLANET = 100;

// Set up the view port
const svg = d3.select("#moons")
.attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

// All moons will be anchored on this object
const plane = svg.append("g")
.attr("transform", `translate(${[MARGIN_PLANET, HEIGHT/2]})`);

d3.json("../../data/sol_2016.json")
.then(function(data) {
    app.planets = data.planets.filter(p => (+p.id.substring(1) >= 3 && +p.id.substring(1) <= 8));
    console.log(app.planets);
    init();
    configureView();
    draw();
});

function init() {
    d3.select("form")
    .selectAll("button")
    .data(app.planets)
    .join("button")
    .attr("type", "button")
    .attr("id", d => d.id)
    .text(d => d.name)
    .on("click", function(event, d) {
        current.id = d.id;
        configureView();
        draw();
    });

    plane.append("circle").attr("class", "planet")
}

function configureView() {
    // 1) Set the current data object
    current.planet = app.planets.filter(p => p.id == current.id)[0];
    current.color  = app.colors[(+current.id.substring(1) - 3)];

    console.log(current);
    d3.select("#planetName").text(() => current.planet.name)

    d3.selectAll("button").property("disabled", false);
    d3.select("button#"+current.id).property("disabled", true);

    // 2) Configure scales for this view
    const maxDiameter = d3.max(current.planet.satellites, d => d.diameterKm);
    current.moons = current.planet.satellites.filter(s => s.diameterKm > maxDiameter/50);
    const sumDiameters = d3.sum(current.moons, d => d.diameterKm);
    const horizSpace = WIDTH - (MARGIN_PLANET + MARGIN_W*2 + current.moons.length*MARGIN_MOON);
    const vertSpace = HEIGHT - MARGIN_H*2;

    scale.range([0, d3.min([vertSpace, horizSpace])])
    .domain([0, sumDiameters]);

    // 4) Sort the moons by their diameter
    current.moons.sort((a,b) => d3.descending(a.diameterKm, b.diameterKm));

    // 4) Compute cx center coordinates to position each moon
    current.moons.forEach(function(moon, i) {
        let space = 0;
        if(i > 0) {
            let previous = current.moons[i-1];
            space = previous.cx + scale(previous.diameterKm)/2 + MARGIN_MOON;
        }
        moon.cx = space + scale(moon.diameterKm)/2;

    })
}
function draw() {
    plane.select(".planet")
    .datum(current.planet)
    .attr("r", d => scale(d.diameterKm)/2)
    .attr("cx", d => -(MARGIN_W + scale(d.diameterKm)/2))
    .style("fill", d => current.color);

    // 3) Draw the moons
    const updateMoons = plane.selectAll("g.moon")
    .data(current.moons);
    const enterMoons = updateMoons.enter()
    .append("g")
    .attr("class", "moon")
    .each(function() {
        const moon = d3.select(this);
        moon.append("circle");
        moon.append("text");
    });
    enterMoons.merge(updateMoons)
    .attr("transform", d => `translate(${[d.cx, 0]})`)
    .each(function() {
        const moon = d3.select(this)
        moon.select("circle")
        .attr("r", d => scale(d.diameterKm)/2);

        moon.select("text")
        .text(d => d.name)
        .attr("transform", d => {
            const x = scale(d.diameterKm)/2 + MARGIN_MOON;
            const y = this.getBBox().height/4;
            return `rotate(-90) translate(${[x,y]})`;
        })
        .on("click", )
    });
    updateMoons.exit().remove();
    
}
