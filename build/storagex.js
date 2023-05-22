export default class StorageX {
    static addUserStorage(userArray) {
        let storage = localStorage.setItem("name", JSON.stringify(userArray));
        return storage;
    }
    static addCurrentUser(user) {
        let storage = localStorage.setItem('currentUser', JSON.stringify(user));
        return storage;
    }
    static updateGenreLikes(userObject, likes) {
        console.log('Function invoked');
        // Retrieve the user data from local storage
        const storedData = localStorage.getItem("name");
        const users = storedData ? JSON.parse(storedData) : [];
        // Find the user by their unique identifier
        console.log('this are the users', users);
        //Iterate through each user and find the the user by id
        for (const user in users) {
            if (users[user].id === userObject.id) {
                users[user].selectedGenres = likes;
            }
        }
        // Save the updated user data back to local storage
        localStorage.setItem("name", JSON.stringify(users));
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
