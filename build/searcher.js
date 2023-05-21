"use strict";
const searchButton = document.getElementById('searchButton');
const searchContainer = document.getElementById('searchContainer');
searchButton.addEventListener('click', () => {
    searchContainer.style.display = 'block';
});
