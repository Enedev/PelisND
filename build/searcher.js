"use strict";
const searchButton = document.getElementById('searchButton');
const searchContainer = document.getElementById('searchContainer');
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
});
