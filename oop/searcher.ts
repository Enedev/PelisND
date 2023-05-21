const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
const searchContainer = document.getElementById('searchContainer') as HTMLElement;

searchButton.addEventListener('click', () => {
  searchContainer.style.display = 'block';
});
