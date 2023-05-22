import Movies from "./movies.js";
import Series from "./series.js";


const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
const searchContainer = document.getElementById('searchContainer') as HTMLElement;
const searchSubmit = document.getElementById('searchSubmit') as HTMLButtonElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const allCheckboxes = document.getElementById('allCheckboxes') as HTMLInputElement;

let currentOption: string = 'movies'; // Opción actual inicializada como 'movies'


//shows the searchbar
searchButton.addEventListener('click', () => {
  searchContainer.style.display = 'block';
  searchButton.style.display = 'none';
  searchInput.value = '';
  allCheckboxes.style.position = 'relative'


});

//Tells me what the user is typing
/* searchBar.addEventListener('input', (e) => {
  console.log(e.target.value)
}) */

//Search the actors
searchSubmit.addEventListener('click', () => {
  if(searchInput.value.length > 0) {
    const actorName = searchInput.value
    if (currentOption === 'movies') {
      Movies.getMoviesByActorName(actorName.trim());
    } else if (currentOption === 'series') {
      Series.getSeriesByActorName(actorName.trim());
    }
    searchInput.value = ''

  } else {
    searchContainer.style.display = 'none';
    searchButton.style.display = 'block';
    allCheckboxes.style.position = 'absolute';

  }

})

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