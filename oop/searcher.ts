import Movies from "./movies.js";

const searchActorButton = document.getElementById('searchButton') as HTMLButtonElement;
const searchContainer = document.getElementById('searchContainer') as HTMLElement;
const searchBar = document.querySelector('#searchContainer #searchInput') as HTMLInputElement

const searchButton = document.querySelector('#searchContainer #searchSubmit') as HTMLButtonElement

//shows the searchbar
searchActorButton.addEventListener('click', () => {
  searchContainer.style.display = 'block';
  console.log(searchButton)
});

//Tells me what the user is typing
/* searchBar.addEventListener('input', (e) => {
  console.log(e.target.value)
}) */

//Search the actors
searchButton.addEventListener('click', () => {
  if(searchBar.value.length > 0) {
    const actorName = searchBar.value
    Movies.getMoviesByActorName(actorName.trim())

  } else {
    console.warn('Escribe algo memoochoa')
  }

})