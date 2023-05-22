import { LoginUi } from "./loginUi.js";
import Movies from "./movies.js";
import StorageX from "./storagex.js";
export const form = document.querySelector("[data-form]");
export const lists = document.querySelector("[data-lists]");
export const input = document.querySelector("[data-input]");
export let userArr = StorageX.getStorage();
export function setUserArr(index) {
    userArr = userArr.filter(e => e !== userArr[index]);
    StorageX.addUserStorage(userArr);
    LoginUi.displayData();
}
export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.selectedGenres = [];
    }
    setGenre(genre) {
        //if the selectedGenres doesn't includes genre
        if (!this.selectedGenres.includes(genre)) {
            this.selectedGenres.push(genre);
        }
        else {
            const index = this.selectedGenres.indexOf(genre);
            this.selectedGenres.splice(index, 1);
            console.warn('Género eliminado');
        }
        StorageX.updateGenreLikes(this, this.selectedGenres);
        if (this.selectedGenres.length > 0) {
            Movies.getMovieByGenre(this.selectedGenres);
        }
        else {
            Movies.getMovies();
        }
        console.log("Estos son los generos del Usuario", this.selectedGenres.length);
    }
}
