import Movies from "./movies.js";
const searchButton = document.getElementById('searchButton');
const searchContainer = document.getElementById('searchContainer');
const searchSubmit = document.getElementById('searchSubmit');
const searchInput = document.getElementById('searchInput');
//shows the searchbar
searchButton.addEventListener('click', () => {
    searchContainer.style.display = 'block';
    searchButton.style.display = 'none';
    searchInput.value = '';
});
//Tells me what the user is typing
/* searchBar.addEventListener('input', (e) => {
  console.log(e.target.value)
}) */
//Search the actors
searchSubmit.addEventListener('click', () => {
    if (searchInput.value.length > 0) {
        const actorName = searchInput.value;
        Movies.getMoviesByActorName(actorName.trim());
        searchInput.value = '';
    }
    else {
        searchContainer.style.display = 'none';
        searchButton.style.display = 'block';
    }
});
