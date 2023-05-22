"use strict";
const typesButton = document.querySelector('.typeButtons button:first-of-type');
const checkboxes = document.querySelector('.checkbox-wrapper-24');
typesButton.addEventListener('click', () => {
    checkboxes.classList.toggle('show');
});
