import { User } from "../user.js";
const userName = document.querySelector('.userName');
class MediaUi {
    //Copy of the StorageX cuz I didn't know how else to try this
    static getStorage() {
        const storage = localStorage.getItem("name") === null ?
            [] : JSON.parse(localStorage.getItem("name") || '{}');
        return storage;
    }
    static getCurrentUser() {
        const storage = this.getStorage();
        const currentUser = localStorage.getItem('currentUser') === null ?
            [] : JSON.parse(localStorage.getItem('currentUser') || '{}');
        userName.innerHTML = currentUser.name;
        return currentUser.name ? currentUser : undefined;
    }
    static displayMedia(content, contentType, currentOption) {
        const media = document.querySelector('.media');
        media.innerHTML = '';
        for (const item of content) {
            let itemContainer = document.createElement('div');
            let title = '';
            let releaseDate = '';
            if (contentType === 'movies' && currentOption === 'movies') {
                title = item.title;
                releaseDate = item.release_date;
            }
            else if (contentType === 'series' && currentOption === 'series') {
                title = item.name;
                releaseDate = item.first_air_date;
            }
            itemContainer.innerHTML = `
            <div class="mediaWatch">
                <img src='https://image.tmdb.org/t/p/w500${item.backdrop_path}'></img>
                <span>${title}</span>
                <span>Release date: ${releaseDate}</span>
            </div>
          `;
            media.appendChild(itemContainer);
        }
    }
    static clearMedia() {
        const media = document.querySelector('.media');
        media.innerHTML = '';
    }
}
let newUser;
window.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    //Creating new user
    const currentUser = MediaUi.getCurrentUser();
    newUser = new User(currentUser.id, currentUser.name);
    //Set past selectedGenres
    newUser.selectedGenres = currentUser.selectedGenres;
    console.log(newUser);
    // Obtener todos los elementos del checkbox de género
    const genreCheckboxes = Array.from(document.querySelectorAll('.genre-checkbox'));
    // Agregar evento a los checkboxes
    for (const checkbox of genreCheckboxes) {
        //check them if user already has
        if (newUser.selectedGenres.includes((_b = (_a = checkbox.nextElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim())) {
            checkbox.checked = true;
        }
        checkbox.addEventListener('change', () => {
            var _a, _b;
            const genre = (_b = (_a = checkbox.nextElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
            console.log('Genre:', genre);
            if (genre) {
                newUser.setGenre(genre);
            }
        });
    }
});
export { MediaUi, newUser };
