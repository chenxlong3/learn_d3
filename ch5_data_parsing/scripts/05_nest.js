const movies = [
    {title:'The Shining', director:'Stanley Kubrick', year:1980},
    {title:'A Clockwork Orange', director:'Stanley Kubrick', year:1972},
    {title:'The Shape of Water', director:'Guillermo del Toro', year:2017},
    {title:'Laberinto del Fauno', director:'Guillermo del Toro', year:2006},
    {title:'2001:A Space Odyssey', director:'Stanley Kubrick', year:1968},
    {title:'Wonder Woman', director:'Patty Jenkins', year: 2017},
];

const groupByDirector = d3.nest()
.key(d => d.director)
.entries(movies);

console.log(groupByDirector);