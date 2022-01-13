const diameters = [
    {planet: 'Mercury', diameterKm: 4879},
    {planet: 'Venus', diameterKm: 12104},
    {planet: 'Earth', diameterKm: 12756},
    {planet: 'Mars', diameterKm: 6792},
    {planet: 'Jupiter', diameterKm: 142984},
    {planet: 'Saturn', diameterKm: 120536},
    {planet: 'Uranus', diameterKm: 51118},
    {planet: 'Neptune', diameterKm: 49528}
];

const scale = d3.scaleLinear().range([0, 800])
.domain([0, d3.max(diameters, d => d.diameterKm)]);

const sel = d3.select("div#list");

diameters.forEach(function(item) {
    sel.append("div").attr("class", "planet")
    .datum(item)
    .style("width", d => scale(d.diameterKm) + "px")
    .text(d => d.planet);
});