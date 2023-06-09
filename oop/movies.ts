import { MediaUi, newUser } from "./mediaUi/mediaUi.js";

let genres:Object;

let currentOption = 'movies'; 

export default class Movies {

    static getMovies():any{
        const media = document.querySelector('.media') as HTMLElement
        media.innerHTML = ''
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1')
        .then(response => response.json())
        .then(data => {
            MediaUi.displayMedia(data.results, 'movies', 'movies');
        })
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
        const media = document.querySelector('.media') as HTMLElement
        media.innerHTML = ''
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
    //displaying genres in base of the user likes
    if (newUser.selectedGenres.length > 0) {
        Movies.getMovieByGenre(newUser.selectedGenres)
    } else {
        //show it by default
        Movies.getMovies()
    }
}, 2000)
