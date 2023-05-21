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
    static displayMedia(movies) {
        const media = document.querySelector('.media');
        for (const movie in movies) {
            let moviesContainer = document.createElement('div');
            moviesContainer.innerHTML = `
                <div>
                    <img src='https://image.tmdb.org/t/p/w500${movies[movie].backdrop_path}'></img>
                    <span>${movies[movie].title}</span>
                    <span>${movies[movie].id}</span>
                </div>
            `;
            media.appendChild(moviesContainer);
        }
    }
}
const currentUser = MediaUi.getCurrentUser();
const newUser = new User(currentUser.id, currentUser.name);
// Obtener todos los elementos del checkbox de género
const genreCheckboxes = Array.from(document.querySelectorAll('.genre-checkbox'));
console.log(genreCheckboxes);
// Agregar evento a los checkboxes
for (const checkbox of genreCheckboxes) {
    checkbox.addEventListener('change', () => {
        var _a, _b;
        const genre = (_b = (_a = checkbox.nextElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
        console.log('Genre:', genre);
        if (genre && currentUser && checkbox.checked) {
            newUser.setGenre(genre);
        }
    });
}
MediaUi.getCurrentUser();
export { MediaUi };
