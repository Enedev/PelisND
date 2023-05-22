import Movies from "./movies.js";
const searchActorButton = document.getElementById('searchButton');
const searchContainer = document.getElementById('searchContainer');
const searchBar = document.querySelector('#searchContainer #searchInput');
const searchButton = document.querySelector('#searchContainer #searchSubmit');
searchActorButton.addEventListener('click', () => {
    searchContainer.style.display = 'block';
    searchButton.style.display = 'none';
    searchBar.value = '';
});
searchButton.addEventListener('click', () => {
    searchContainer.style.display = 'none';
    searchButton.style.display = 'block';
});
searchButton.addEventListener('click', () => {
    if (searchBar.value.length > 0) {
        const actorName = searchBar.value;
        Movies.getMoviesByActorName(actorName.trim());
    }
    else {
        console.warn('Escribe algo memoochoa');
    }
});
