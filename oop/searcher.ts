import Movies from "./movies";

const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
const searchContainer = document.getElementById('searchContainer') as HTMLElement;
const searchSubmit = document.getElementById('searchSubmit') as HTMLButtonElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;


//shows the searchbar
searchButton.addEventListener('click', () => {
  searchContainer.style.display = 'block';
  searchButton.style.display = 'none';
  searchInput.value = '';

});

searchSubmit.addEventListener('click', () => {
  searchContainer.style.display = 'none';
  searchButton.style.display = 'block';
});

//Tells me what the user is typing
/* searchBar.addEventListener('input', (e) => {
  console.log(e.target.value)
}) */

//Search the actors
searchSubmit.addEventListener('click', () => {
  if(searchSubmit.value.length > 0) {
    const actorName = searchSubmit.value
    Movies.getMoviesByActorName(actorName.trim())

  } else {
    console.warn('Escribe algo memoochoa')
  }

})