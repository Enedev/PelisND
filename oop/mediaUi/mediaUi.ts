import Movies from "../movies.js";
import { User } from "../user.js";

const userName = document.querySelector('.userName') as HTMLElement

class MediaUi {
    //Copy of the StorageX cuz I didn't know how else to try this
    static getStorage():any {
        const storage = localStorage.getItem("name") === null ?
        [] : JSON.parse(localStorage.getItem("name") || '{}');
        return storage;
    }
    static getCurrentUser() {
        const storage = this.getStorage()
        const currentUser = localStorage.getItem('currentUser') === null ?
        [] : JSON.parse(localStorage.getItem('currentUser') || '{}')
        
        userName.innerHTML = currentUser.name
        
        return currentUser.name ? currentUser : undefined;
    }
    static displayMedia(movies:any) {
        const media = document.querySelector('.media') as HTMLElement

        for(const movie in movies) {
            let moviesContainer = document.createElement('div')
            moviesContainer.innerHTML = `
                <div class = "mediaWatch">
                    <img src='https://image.tmdb.org/t/p/w500${movies[movie].backdrop_path}'></img>
                    <span>${movies[movie].title}</span>
                    <span>Release data: ${movies[movie].release_date}</span>
                </div>
            `
            media.appendChild(moviesContainer)
        }
    }
}

let newUser:User

window.addEventListener('DOMContentLoaded', () => {
    //Creating new user
    const currentUser = MediaUi.getCurrentUser();
    newUser = new User(currentUser.id, currentUser.name)
    
    //Set past selectedGenres
    newUser.selectedGenres = currentUser.selectedGenres
    console.log(newUser);
    
    // Obtener todos los elementos del checkbox de género
    const genreCheckboxes = Array.from(document.querySelectorAll('.genre-checkbox'));
    
    // Agregar evento a los checkboxes
    for (const checkbox of genreCheckboxes) {
        //check them if user already has
        if(newUser.selectedGenres.includes(checkbox.nextElementSibling?.textContent?.trim())) {
            checkbox.checked = true
        }
        checkbox.addEventListener('change', () => {
            const genre = checkbox.nextElementSibling?.textContent?.trim();
            console.log('Genre:', genre);
            if(genre) {
                newUser.setGenre(genre);
            }
        });
    }
})

export {
    MediaUi,
    newUser
}