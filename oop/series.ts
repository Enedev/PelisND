export class Series{
    
    static getSeries():any{
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US&page=1')
        .then(response => response.json())
        .then(data => console.log(data));
    }
    static getGenre():any{
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f01475a6fe591a8726e11259c3a2e0b0&language=en-US')
        .then(response => response.json())
        .then(data => console.log(data));
    }
}

console.log(Series.getSeries())
