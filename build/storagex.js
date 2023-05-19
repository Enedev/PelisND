export default class StorageX {
    static addUserStorage(userArray) {
        let storage = localStorage.setItem("name", JSON.stringify(userArray));
        return storage;
    }
    static addCurrentUser(user) {
        let storage = localStorage.setItem('currentUser', JSON.stringify(user));
        return storage;
    }
    static getStorage() {
        const storage = localStorage.getItem("name") === null ?
            [] : JSON.parse(localStorage.getItem("name") || '{}');
        return storage;
    }
    static getUser(storage, userElement) {
        //Getting the userNickname in the HTML
        const userNickName = userElement.innerHTML;
        //Getting the user information
        for (const user in storage) {
            //No le paren bolas a esos errores, tengan fé
            if (storage[user].name === userNickName) {
                console.log(`AJA! ${storage[user].name} coincide con el elemento HTML ${userNickName}!`);
                return storage[user];
            }
            else {
                /* console.log('El usuario no concide, hmmm, rarísimo') */
                continue;
            }
        }
    }
}
