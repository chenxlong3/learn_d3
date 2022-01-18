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


console.log(groupByDirector);
console.log(groupByYear);