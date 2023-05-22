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
    
    static displayMedia(content: any[], contentType: string, currentOption: string) {
        const media = document.querySelector('.media') as HTMLElement;
        media.innerHTML = '';
    
        for (const item of content) {
          let itemContainer = document.createElement('div');
    
          let title = '';
          let releaseDate = '';
    
          if (contentType === 'movies' && currentOption === 'movies') {
            title = item.title;
            releaseDate = item.release_date;
          } else if (contentType === 'series' && currentOption === 'series') {
            title = item.name;
            releaseDate = item.first_air_date;
          }
    
          itemContainer.innerHTML = `
            <div class="mediaWatch">
                <img src='https://image.tmdb.org/t/p/w500${item.backdrop_path}'></img>
                <span>${title}</span>
                <span>Release date: ${releaseDate}</span>
            </div>
          `;
    
          media.appendChild(itemContainer);
        }
      }
      
      
    static clearMedia() {
        const media = document.querySelector('.media') as HTMLElement;
        media.innerHTML = '';
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