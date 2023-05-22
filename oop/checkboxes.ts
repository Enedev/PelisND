const typesButton = document.querySelector('.typeButtons button:first-of-type');
const checkboxes = document.querySelector('.checkbox-wrapper-24');

if (typesButton){
  typesButton.addEventListener('click', () => {
    if (checkboxes){
        checkboxes.classList.toggle('show');
    }
  });
}

