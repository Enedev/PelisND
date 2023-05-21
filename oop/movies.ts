import { MediaUi } from "./mediaUi/mediaUi.js";

let genres:Object;

let arr = ['Thriller', 'Adventure']

export default class Movies{

    static getMovies():any{
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1')
        .then(response => response.json())
        /* .then(data => console.log(data, 'estas son las películas')); */
    }

    static getGenre():any{
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US')
        .then(response => response.json())
        .then(data => {
            genres = data.genres
            console.log(genres, 'Estos son los géneros de las películas')
        })
    }

    static async getMovieByGenre(likes:String[]) {
        let id = ''
        
        for(const genre in genres) {
            if(likes.includes(genres[genre].name  )) {
                id = genres[genre].id;
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1&with_genres=${id}`)
                    const data = await response.json()
                    console.log(data.results, `Data for the ${genres[genre].name} genre`);
                    MediaUi.displayMedia(data.results);
                } catch(error) {
                    throw new Error(`Error: ${error}`)
                }
            }
        }
    }

}
Movies.getMovies()
Movies.getGenre()

setTimeout(() => {
    Movies.getMovieByGenre(arr)
},2000)