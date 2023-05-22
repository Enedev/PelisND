import { MediaUi } from "./mediaUi/mediaUi.js";
import Series from './series.js';
let genres:Object;

let arr = ['Thriller', 'Adventure']
let currentOption = 'movies'; 

  // Resto del código de Movies...
  export default class Movies {
    static getMovies(): any {
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1')
        .then(response => response.json())
        .then(data => {
          MediaUi.clearMedia();
          // Mostrar las películas solo si la opción actual es películas
          if (currentOption === 'movies') {
            MediaUi.displayMedia(data.results, 'movies', 'movies');
          }
        })
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
                    MediaUi.displayMedia(data.results, 'movies', 'movies');
                } catch(error) {
                    throw new Error(`Error: ${error}`)
                }
            }
        }
    }

    static getMoviesByActorName(name: string) {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&query=${name}`)
          .then(response => response.json())
          .then(data => {
            const media = document.querySelector('.media') as HTMLElement;
            media.innerHTML = '';
            const actor = data.results[0];
      
            if (actor) {
              const movies = actor.known_for.filter((item: any) => item.media_type === 'movie');
      
              MediaUi.clearMedia();
              MediaUi.displayMedia(movies, 'movies', 'movies');
            }
          });
      }
      

    static getMoviesByReleaseData(start_date: string, end_date: string) {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f01475a6fe591a8726e11259c3a2e0b0&primary_release_date.gte=${start_date}&primary_release_date.lte=${end_date}`)
        
        .then(response => response.json())
        .then(data => {
            const media2 = document.querySelector('.media') as HTMLElement
            media2.innerHTML = ''
            const yearMovies = data.results
            console.log(yearMovies[0])
            //Showin' data yearMovies
            MediaUi.displayMedia(yearMovies,"movies", 'movies')

        })
    }
    

}
console.log("probando1",Movies.getMovies())
Movies.getGenre()

function switchToMovies() {
    currentOption = 'movies';

    Movies.getMovies();
}

const moviesButton = document.getElementById('moviesButton');
if (moviesButton){
    moviesButton.addEventListener('click', switchToMovies);
}
  
setTimeout(() => {
    Movies.getMovieByGenre(arr)
},2000)
