const movies = [
    {title: 'Arrival', director: 'Denis Villeneuve', year: 2016},
    {title: 'Interstellar', director: 'Christopher Nolan', year: 2014},
    {title: 'Rogue One', director: 'Gareth Edwards', year: 2016},
    {title: 'The Shining', director: 'Stanley Kubrick', year: 1980},
    {title: 'A Clockwork Orange', director: 'Stanley Kubrick', year:
     1972},
    {title: 'Dunkirk', director: 'Christopher Nolan', year: 2017},
    {title: 'Solyaris', director: 'Andrei Tarkovsky', year: 1972},
    {title: 'Stalker', director: 'Andrei Tarkovsky', year: 1979},
    {title: 'Wonder Woman', director: 'Patty Jenkins', year: 2017},
];

const groupByDirector = d3.group(movies, d => d.director);

const sortedMovies = movies.sort((a, b) => d3.ascending(a.year, b.year));
const groupByYear = d3.group(sortedMovies, d => d.year);
const byYearandDirector = d3.group(movies, d => d.year, d => d.director);
const byYearRollUp = d3.rollup(movies, v => v.map(d => d.title + `(${d.director})`), d => d.year);
const arr_1 = Array.from(byYearRollUp);
const arr_2 = [...byYearRollUp]

console.log(groupByDirector);
console.log(groupByYear);
console.log(byYearandDirector);
console.log(byYearRollUp);
console.log(arr_1);
console.log(arr_2);