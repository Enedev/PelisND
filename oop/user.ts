// user.ts

import { LoginUi } from "./loginUi.js";
import Movies from "./movies.js";
import StorageX from "./storagex.js";
import { MediaUi } from "./mediaUi/mediaUi.js";

export const form = document.querySelector("[data-form]") as HTMLFormElement;
export const lists = document.querySelector("[data-lists]") as HTMLDListElement;
export const input = document.querySelector("[data-input]") as HTMLInputElement;

export let userArr: User[] = StorageX.getStorage();

export function setUserArr(index: number) {
    const newUsers = userArr.filter(e => e !== userArr[index]);
    StorageX.addUserStorage(newUsers);
    LoginUi.displayData();
}

export class User {
    id: number;
    name: string;
    selectedGenres!: string[];
    likes!: string[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.selectedGenres = [];
        this.likes = [];
    }

    public setGenre(genre: string) {
        if (!this.selectedGenres.includes(genre)) {
            this.selectedGenres.push(genre);
        } else {
            const index = this.selectedGenres.indexOf(genre);
            this.selectedGenres.splice(index, 1);
            console.warn('Género eliminado');
        }

        StorageX.updateGenreLikes(this, this.selectedGenres);
        if (this.selectedGenres.length > 0) {
            Movies.getMovieByGenre(this.selectedGenres);
        } else {
            Movies.getMovies();
        }
        console.log("Estos son los géneros del Usuario", this.selectedGenres.length);
    }

    public setLike(like: string) {
        if (!this.likes.includes(like)) {
          this.likes.push(like);
        } else {
          const index = this.likes.indexOf(like);
          this.likes.splice(index, 1);
          console.warn('Like eliminado');
        }
      
        StorageX.updateUserLikes(this, this.likes);
        Movies.getMovies();
        console.log("Estos son los likes del Usuario", this.likes.length);

      }
      
}
