export default class Movies {
    static getMovies() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1')
            .then(response => response.json())
            .then(data => console.log(data));
    }
    static getGenre() {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US')
            .then(response => response.json())
            .then(data => console.log(data));
    }
}
console.log(Movies.getMovies());
console.log(Movies.getGenre());
