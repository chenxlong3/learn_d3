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
    app.planets = data.planets.filter(p => +p.id.substring(1) >= 3 && +p.id.substring(1) <= 8);
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
    .on("click", function(d) {
        current.id = d.id;
        configureView();
        draw();
    });

    plane.append("circle").attr("class", "planet")
}

function configureView() {
    // 1) Set the current data object
    current.planet = app.planets.filter(p => p.id == current.id)[0];
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
    plane.selectAll("g.moon")
    .data(current.moons)
    .enter()
    .append("g")
    .attr("class", "moon")
    .attr("transform", d => `translate(${[d.cx, 0]})`)
    .each(function() {
        const moon = d3.select(this)
        moon.append("circle")
        .attr("r", d => scale(d.diameterKm)/2);

        moon.append("text")
        .text(d => d.name)
        .attr("transform", d => {
            const x = scale(d.diameterKm/2) + MARGIN_MOON;
            const y = this.getBBox().height/4;
            return `rotate(-90) translate(${[x,y]})`;
        })
    })
}

// const app = {
//     planets: [],   // data will be loaded from external file
//     colors: ['#4169e1', '#cc8530', '#d4a450', '#dab520', '7fffd4', '1e90ff']
// }

// // This object contains variables that change for each view
// const current = {
//     moons: [],          // the moons to be displayed
//     id: undefined,      // key to select current object
//     planet: {},         // the object used in the current view
//     color: "black"      // color of the planet
// }
// current.id = "p5"; // start with Jupiter id = "p5"

// // A function that will scale the diameters in km to pixels
// const scale = d3.scaleLinear();

// // Dimensions and spacing for the SVG graphics context
// const WIDTH = 500, HEIGHT = 300;
// const MARGIN_W = 20, MARGIN_H = 50;
// const MARGIN_MOON = 10;    // space between moons
// const MARGIN_PLANET = 100; // space that will be reserved for the planet

// // Obtain a handle to the SVG element and set up the view port
// const svg = d3.select("#moons")
//         .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

// // All moons will be anchored on this object (the orbital plane)
// const plane = svg.append("g")
//         .attr("transform", `translate(${[MARGIN_PLANET, HEIGHT/2]})`);

// // Loads the data file (take a look at it before proceeding)
// d3.json("../Data/sol_2016.json")
//     .then(function(data) {
//         // only include planets with moons (p3 to p8)
//         app.planets = data.planets
//                         .filter(p => +p.id.substring(1) >= 3
//                 && +p.id.substring(1) <= 8);
//         init(); // add this line
//         configureView();
//         draw();
//     });

// function init() {
//     // 1) Set up buttons panel
//     d3.select("form")
//         .selectAll("button")
//         .data(app.planets)
//         .enter()
//         .append("button")
//         .attr("type", "button") // disables default submission event
//         .attr("id", d => d.id)
//         .text(d => d.name)
//         .on("click", function(d) {
//                 current.id = d.id;
//                 configureView();
//                 draw();
//             });

//     // 2) Add circle for the planets
//     plane.append("circle")
//             .attr("class", "planet")
// }

// function configureView() {
//     // 1) Get the current data object and color
//     current.planet = app.planets.filter(p => p.id == current.id)[0];
//     current.color  = app.colors[(+current.id.substring(1) - 3)];

//     // 2) Change page title
//     d3.select('#planetName').text(() => current.planet.name)

//     // 3) Disable button for currently displayed planet
//     d3.selectAll("button").property("disabled", false);
//     d3.select("button#"+current.id).property("disabled", true);

//     // 4) Configure scales for this view
//     // a) obtain the diameter of the largest moon
//     const maxDiameter = d3.max(current.planet.satellites, d => d.diameterKm);

//     // b) include only moons with 1/50 of the size of the largest moon or larger
//     current.moons = current.planet.satellites
//                     .filter(s => s.diameterKm > maxDiameter/50);

//     // c) add diameters (they will be drawn side by side)
//     const sumDiameters = d3.sum(current.moons,d => d.diameterKm);

//     // d) calculate space occupied by the circles
//     const horizSpace = WIDTH - (MARGIN_PLANET + MARGIN_W*2 + current.moons.length * MARGIN_MOON);
//     const vertSpace  = HEIGHT - MARGIN_H*2;

//     // e) configure the scale
//     scale.range([0, d3.min([vertSpace, horizSpace])])
//             .domain([0, sumDiameters]);

//     // 5) Sort the moons by their diameter
//     current.moons.sort((a,b) => d3.descending(a.diameterKm, b.diameterKm));

//     // 6) Compute cx center coordinates to position each moon
//     current.moons.forEach(function(moon, i) {
//         let space = 0;
//         if(i > 0) {
//             let previous = current.moons[i-1]
//             space = previous.cx
//                     + scale(previous.diameterKm)/2
//                     + MARGIN_MOON;
//         }
//         moon.cx = space + scale(moon.diameterKm)/2;
//     });
// }

// function draw() {
//     // 1) Draw a guide line showing the orbital plane
//     // plane.append("line").attr("x1",0).attr("x2",WIDTH) .style("stroke","red");

//     // 2) update the planet
//     plane.select(".planet")
//         .datum(current.planet)
//         .attr("r", d => scale(d.diameterKm)/2)
//         .attr("cx", d => -(MARGIN_W + scale(d.diameterKm)/2))
//         .style("fill", d => current.color);

//     // 3) draw the moons
//     plane.selectAll("g.moon")
//         .data(current.moons)
//         .enter()
//         .append("g").attr("class", "moon")
//         .attr("transform", d => `translate(${[d.cx,0]})`)
//         .each(function() {  // each g object contains a circle and text
//             const moon = d3.select(this); // current group
//             moon.append("circle")
//                 .attr("r", d => scale(d.diameterKm)/2);
//             moon.append("text")
//                 .text(d => d.name)
//                 .attr("transform", function(d) {
//                     const x = scale(d.diameterKm/2) + MARGIN_MOON;
//                     const y = this.getBBox().height/4;
//                     return `rotate(-90) translate(${[x,y]})`;
//                 });
//         });
// }