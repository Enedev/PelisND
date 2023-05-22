var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MediaUi } from "./mediaUi/mediaUi.js";
import { newUser } from "./mediaUi/mediaUi.js";
let genres;
export default class Movies {
    static getMovies() {
        const media = document.querySelector('.media');
        media.innerHTML = '';
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1')
            .then(response => response.json())
            .then(data => {
            MediaUi.displayMedia(data.results);
        });
        /* .then(data => console.log(data, 'estas son las películas')); */
    }
    static getGenre() {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US')
            .then(response => response.json())
            .then(data => {
            genres = data.genres;
            console.log(genres, 'Estos son los géneros de las películas');
        });
    }
    static getMovieByGenre(likes) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = '';
            const media = document.querySelector('.media');
            media.innerHTML = '';
            for (const genre in genres) {
                if (likes.includes(genres[genre].name)) {
                    id = genres[genre].id;
                    try {
                        const response = yield fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1&with_genres=${id}`);
                        const data = yield response.json();
                        console.log(data.results, `Data for the ${genres[genre].name} genre`);
                        MediaUi.displayMedia(data.results);
                    }
                    catch (error) {
                        throw new Error(`Error: ${error}`);
                    }
                }
            }
        });
    }
    static getMoviesByActorName(name) {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&query=${name}`)
            .then(response => response.json())
            .then(data => {
            const media = document.querySelector('.media');
            media.innerHTML = '';
            const movies = data.results;
            console.log(movies[0]);
            //Showinf actor movies
            MediaUi.displayMedia(movies[0].known_for);
        });
    }
    static getMoviesByReleaseData(start_date, end_date) {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f01475a6fe591a8726e11259c3a2e0b0&primary_release_date.gte=${start_date}&primary_release_date.lte=${end_date}`)
            .then(response => response.json())
            .then(data => {
            const media2 = document.querySelector('.media');
            media2.innerHTML = '';
            const yearMovies = data.results;
            console.log(yearMovies[0]);
            //Showin' data yearMovies
            MediaUi.displayMedia(yearMovies);
        });
    }
}
//This will give us the genres we want to get
Movies.getGenre();
setTimeout(() => {
    //displaying genres in base of the user likes
    if (newUser.selectedGenres.length > 0) {
        Movies.getMovieByGenre(newUser.selectedGenres);
    }
    else {
        //show it by default
        Movies.getMovies();
    }
}, 2000);
