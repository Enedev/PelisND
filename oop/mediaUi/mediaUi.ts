import Movies from "../movies.js";
import { User } from "../user.js";
import StorageX from "../storagex.js";



const userName = document.querySelector('.userName') as HTMLElement;

class MediaUi {
  static getStorage(): any {
    const storage = localStorage.getItem("name") === null ? [] : JSON.parse(localStorage.getItem("name") || '{}');
    return storage;
  }

  static getCurrentUser() {
    const storage = this.getStorage();
    const currentUser = localStorage.getItem('currentUser') === null ? [] : JSON.parse(localStorage.getItem('currentUser') || '{}');

    userName.innerHTML = currentUser.name;

    return currentUser.name ? currentUser : undefined;
  }

  static displayMedia(content: any[], contentType: string, currentOption: string) {
    const media = document.querySelector('.media') as HTMLElement;
    media.innerHTML = '';

    for (const item of content) {
      let itemContainer = document.createElement('div');
      itemContainer.className = 'mediaWatch media'; // Agregado el nombre de clase 'media-item'

      let title = '';
      let releaseDate = '';

      if (contentType === 'movies' && currentOption === 'movies') {
        title = item.title;
        releaseDate = item.release_date;
      } else if (contentType === 'series' && currentOption === 'series') {
        title = item.name;
        releaseDate = item.first_air_date;
      }

      // Crear elementos HTML para la imagen y el título
      let imageElement = document.createElement('img');
      imageElement.src = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;

      let titleElement = document.createElement('span');
      titleElement.textContent = title;

      let releaseDateElement = document.createElement('span');
      releaseDateElement.textContent = `Release date: ${releaseDate}`;

      // Crear el botón de "me gusta" (like)
      let likeButton = document.createElement('button');
      likeButton.className = 'like-button';
      likeButton.textContent = '♥';

      // Agregar eventos al botón de "me gusta"
      likeButton.addEventListener('click', () => {
        this.toggleLikeButton(title);
        likeButton.classList.toggle('liked');
      });

      // Agregar los elementos al contenedor
      itemContainer.appendChild(imageElement);
      itemContainer.appendChild(titleElement);
      itemContainer.appendChild(releaseDateElement);

      // Agregar el botón de "me gusta" solo al pasar el cursor sobre la imagen
      itemContainer.addEventListener('mouseenter', () => {
        itemContainer.appendChild(likeButton);
      });

      // Remover el botón de "me gusta" al quitar el cursor de la imagen
      itemContainer.addEventListener('mouseleave', () => {
        itemContainer.removeChild(likeButton);
      });

      media.appendChild(itemContainer);
    }
  }

  static toggleLikeButton(title:any) {
    const currentUser = MediaUi.getCurrentUser();
    
    if (currentUser && currentUser.likes) {
      const likedMovies = currentUser.likes;
      
      const index = likedMovies.indexOf(title);
  
      if (index !== -1) {
        likedMovies.splice(index, 1);
      } else {
        likedMovies.push(title);
      }
  
      StorageX.updateUserLikes(currentUser, likedMovies);
    }
  }
  
  static getLikedMovies() {
    const storage = localStorage.getItem('likedMovies');
    return storage ? JSON.parse(storage) : [];
  }

  static saveLikedMovies(likedMovies: string[]) {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  }

  static clearMedia() {
    const media = document.querySelector('.media') as HTMLElement;
    media.innerHTML = '';
  }
}
const likesContainer = document.getElementById("likes-container");

// Crea una función para mostrar los likes en el contenedor
export function mostrarLikes(likes:any) {
  // Limpia el contenido del contenedor
  if (likesContainer){
    likesContainer.innerHTML = "";

  }

  // Crea un elemento <ul> para mostrar la lista de likes
  const ul = document.createElement("ul");

  // Itera sobre cada like y crea un elemento <li> para cada uno
  likes.forEach((like:any) => {
    const li = document.createElement("li");
    li.textContent = like;
    ul.appendChild(li);
  });

  // Agrega la lista de likes al contenedor
  if (likesContainer){
    likesContainer.appendChild(ul);

  }
}

let newUser: User;

window.addEventListener('DOMContentLoaded', () => {
  //Creating new user
  const currentUser = MediaUi.getCurrentUser();
  newUser = new User(currentUser.id, currentUser.name)
  newUser.likes = currentUser.likes; // Agregar esta línea para asignar los likes del currentUser a newUser

  //Set past selectedGenres
  newUser.selectedGenres = currentUser.selectedGenres
  console.log(newUser);
  
  // Obtener todos los elementos del checkbox de género
  const likeButtons = Array.from(document.querySelectorAll('.like-button'));
  for (const button of likeButtons) {
    const like = button.dataset.like;
    if (like) {
      button.addEventListener('click', () => {
        newUser.setLike(like);
      });
    }
  }
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
    // Obtén el elemento donde quieres mostrar los likes
  // Llama a la función mostrarLikes con los likes del currentUser
  mostrarLikes(currentUser.likes);
})

export { MediaUi, newUser };
