import Movies from "./movies.js";
import Series from "./series.js";
const yearButton = document.getElementById('yearButton');
const yearSearchContainer = document.getElementById('yearSearchContainer');
const yearSearchSubmit = document.getElementById('yearSearchSubmit');
const yearSearchInput = document.getElementById('yearSearchInput');
const allCheckboxes = document.getElementById('allCheckboxes');
let currentOption = 'movies'; // Opción actual inicializada como 'movies'
//shows the searchbar
yearButton.addEventListener('click', () => {
    yearSearchContainer.style.display = 'block';
    yearButton.style.display = 'none';
    yearSearchInput.value = '';
    allCheckboxes.style.position = 'relative';
});
//Tells me what the user is typing
/* searchBar.addEventListener('input', (e) => {
  console.log(e.target.value)
}) */
//Search the actors
yearSearchSubmit.addEventListener('click', () => {
    if (yearSearchInput.value.length > 0) {
        const release_year = yearSearchInput.value.trim();
        const firstDayOfYear = `${release_year}-01-01`;
        const lastDayOfYear = `${release_year}-12-31`;
        if (currentOption === 'movies') {
            Movies.getMoviesByReleaseData(firstDayOfYear, lastDayOfYear);
        }
        else if (currentOption === 'series') {
            Series.getSeriesByReleaseData(firstDayOfYear, lastDayOfYear);
        }
        yearSearchInput.value = '';
    }
    else {
        yearSearchContainer.style.display = 'none';
        yearButton.style.display = 'block';
        allCheckboxes.style.position = 'absolute';
    }
});
// Cambia la opción actual a 'movies'
function switchToMovies() {
    Movies.getMovies();
    currentOption = 'movies';
}
// Cambia la opción actual a 'series'
function switchToSeries() {
    Series.getSeries();
    currentOption = 'series';
}
const moviesButton = document.getElementById('moviesButton');
if (moviesButton) {
    moviesButton.addEventListener('click', switchToMovies);
}
const seriesButton = document.getElementById('seriesButton');
if (seriesButton) {
    seriesButton.addEventListener('click', switchToSeries);
}
