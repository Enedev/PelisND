const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
const searchContainer = document.getElementById('searchContainer') as HTMLElement;
const searchSubmit = document.getElementById('searchSubmit') as HTMLButtonElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;


searchButton.addEventListener('click', () => {
  searchContainer.style.display = 'block';
  searchButton.style.display = 'none';
  searchInput.value = '';

});

searchSubmit.addEventListener('click', () => {
  searchContainer.style.display = 'none';
  searchButton.style.display = 'block';
});
