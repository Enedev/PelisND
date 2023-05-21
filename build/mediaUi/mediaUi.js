const userName = document.querySelector('.userName');
class MediaUi {
    //Copy of the StorageX cuz I didn't know how else to try this
    static getStorage() {
        const storage = localStorage.getItem("name") === null ?
            [] : JSON.parse(localStorage.getItem("name") || '{}');
        return storage;
    }
    static getCurrentUser() {
        const storage = this.getStorage();
        const currentUser = localStorage.getItem('currentUser') === null ?
            [] : JSON.parse(localStorage.getItem('currentUser') || '{}');
        userName.innerHTML = currentUser.name;
    }
    static displayMedia(movies) {
        const media = document.querySelector('.media');
        for (const movie in movies) {
            let moviesContainer = document.createElement('div');
            moviesContainer.innerHTML = `
                <div>
                    <img src='https://image.tmdb.org/t/p/w500${movies[movie].backdrop_path}'></img>
                    <span>${movies[movie].title}</span>
                </div>
            `;
            media.appendChild(moviesContainer);
        }
    }
}
MediaUi.getCurrentUser();
export { MediaUi };
