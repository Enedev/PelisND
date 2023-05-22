import Movies from "./movies.js";
const searchActorButton = document.getElementById('searchButton');
const searchContainer = document.getElementById('searchContainer');
<<<<<<< HEAD
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
=======
const searchSubmit = document.getElementById('searchSubmit');
const searchInput = document.getElementById('searchInput');
searchButton.addEventListener('click', () => {
    searchContainer.style.display = 'block';
    searchButton.style.display = 'none';
    searchInput.value = '';
});
searchSubmit.addEventListener('click', () => {
    searchContainer.style.display = 'none';
    searchButton.style.display = 'block';
>>>>>>> 144bf7d44997c3185e5e279219cbc8c6920b54d2
});
