// user.ts
import { LoginUi } from "./loginUi.js";
import Movies from "./movies.js";
import StorageX from "./storagex.js";
export const form = document.querySelector("[data-form]");
export const lists = document.querySelector("[data-lists]");
export const input = document.querySelector("[data-input]");
export let userArr = StorageX.getStorage();
export function setUserArr(index) {
    const newUsers = userArr.filter(e => e !== userArr[index]);
    StorageX.addUserStorage(newUsers);
    LoginUi.displayData();
}
export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.selectedGenres = [];
        this.likes = [];
    }
    setGenre(genre) {
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
        console.log("Estos son los géneros del Usuario", this.selectedGenres.length);
    }
    setLike(like) {
        if (!this.likes.includes(like)) {
            this.likes.push(like);
        }
        else {
            const index = this.likes.indexOf(like);
            this.likes.splice(index, 1);
            console.warn('Like eliminado');
        }
        StorageX.updateUserLikes(this, this.likes);
        Movies.getMovies();
        console.log("Estos son los likes del Usuario", this.likes.length);
    }
}
