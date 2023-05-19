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
    }
}


MediaUi.getCurrentUser()

export {
    MediaUi
}