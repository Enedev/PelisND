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
                <div>
                    <img src='https://image.tmdb.org/t/p/w500${movies[movie].backdrop_path}'></img>
                    <span>${movies[movie].title}</span>
                    <span>${movies[movie].id}</span>
                </div>
            `
            media.appendChild(moviesContainer)
        }
    }
}

const currentUser = MediaUi.getCurrentUser();

const newUser = new User(currentUser.id, currentUser.name)
// Obtener todos los elementos del checkbox de género
const genreCheckboxes = Array.from(document.querySelectorAll('.genre-checkbox'));

// Agregar evento a los checkboxes
for (const checkbox of genreCheckboxes) {
    checkbox.addEventListener('change', () => {
        const genre = checkbox.nextElementSibling?.textContent?.trim();
        console.log('Genre:', genre);
        if(genre) {
            newUser.setGenre(genre);
        }
    });
}

MediaUi.getCurrentUser()

export {
    MediaUi
}