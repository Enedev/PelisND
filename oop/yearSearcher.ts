import Movies from "./movies.js";

const yearButton = document.getElementById('yearButton') as HTMLButtonElement;
const yearSearchContainer = document.getElementById('yearSearchContainer') as HTMLElement;
const yearSearchSubmit = document.getElementById('yearSearchSubmit') as HTMLButtonElement;
const yearSearchInput = document.getElementById('yearSearchInput') as HTMLInputElement;
const allCheckboxes = document.getElementById('allCheckboxes') as HTMLInputElement;



//shows the searchbar
yearButton.addEventListener('click', () => {
  yearSearchContainer.style.display = 'block';
  yearButton.style.display = 'none';
  yearSearchInput.value = '';
  allCheckboxes.style.position = 'relative'

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
  
      Movies.getMoviesByReleaseData(firstDayOfYear, lastDayOfYear);
      yearSearchInput.value = '';
    } else {
      yearSearchContainer.style.display = 'none';
      yearButton.style.display = 'block';
      allCheckboxes.style.position = 'absolute';

    }
});
  