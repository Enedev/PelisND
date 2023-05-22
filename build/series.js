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
let genres;
let currentOption = 'movies'; // Opción actual, por defecto películas
export default class Series {
    static getSeries() {
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1')
            .then(response => response.json())
            .then(data => {
            MediaUi.clearMedia();
            // Mostrar las series solo si la opción actual es series
            if (currentOption === 'series') {
                MediaUi.displayMedia(data.results, 'series', 'series');
            }
        });
    }
    static getGenres() {
        fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US')
            .then(response => response.json())
            .then(data => {
            genres = data.genres;
            console.log(genres, 'Estos son los géneros de las series');
        });
    }
    static getSeriesByGenre(genreName) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = genres.find((g) => g.name === genreName);
            if (genre) {
                const id = genre.id;
                try {
                    const response = yield fetch(`https://api.themoviedb.org/3/discover/tv?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1&with_genres=${id}`);
                    const data = yield response.json();
                    console.log(data.results, `Data for the ${genreName} genre`);
                    MediaUi.clearMedia();
                    MediaUi.displayMedia(data.results, 'series', 'series');
                }
                catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            }
        });
    }
    static getSeriesByActorName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://api.themoviedb.org/3/search/person?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&query=${name}`);
                const data = yield response.json();
                const actor = data.results[0];
                if (actor) {
                    const series = actor.known_for.filter((item) => item.media_type === "tv");
                    MediaUi.clearMedia();
                    MediaUi.displayMedia(series, 'series', 'series');
                }
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    static getSeriesByReleaseData(start_date, end_date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://api.themoviedb.org/3/discover/tv?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1&first_air_date.gte=${start_date}&first_air_date.lte=${end_date}`);
                const data = yield response.json();
                console.log(data.results, `Series released between ${start_date} and ${end_date}`);
                MediaUi.clearMedia();
                MediaUi.displayMedia(data.results, 'series', 'series');
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
}
Series.getGenres();
function switchToSeries() {
    currentOption = 'series';
    Series.getSeries(); // Lógica para mostrar las series en el DOM
}
const seriesButton = document.getElementById('seriesButton');
if (seriesButton) {
    seriesButton.addEventListener('click', switchToSeries);
}
