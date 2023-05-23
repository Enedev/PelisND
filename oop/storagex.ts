import { User } from "./user";
import { mostrarLikes } from "./mediaUi/mediaUi.js";

export default class StorageX {
  static addUserStorage(userArray: object[]) {
    let storage = localStorage.setItem("name", JSON.stringify(userArray));
    return storage;
  }

  static addCurrentUser(user: Object) {
    let storage = localStorage.setItem("currentUser", JSON.stringify(user));
    return storage;
  }

  static updateGenreLikes(userObject: User, likes: string[]) {
    // Retrieve the user data from local storage
    const storedData = localStorage.getItem("name");
    const users = storedData ? JSON.parse(storedData) : [];

    // Find the user by their unique identifier
    for (const user of users) {
      if (user.id === userObject.id) {
        user.selectedGenres = likes;
        break;
      }
    }

    // Save the updated user data back to local storage
    localStorage.setItem("name", JSON.stringify(users));
  }

  static updateUserLikes(userObject: User, likes: string[]) {
    console.log('likes enviados', likes)
    const storedData = localStorage.getItem("name");
    const currentUserData = localStorage.getItem("currentUser");

    let users = storedData ? JSON.parse(storedData) : [];
    let currentUser = currentUserData ? JSON.parse(currentUserData) : [];
  
    for (const user of users) {
      if (user.id === userObject.id) {
        user.likes= likes;
        break;
      }
    }

    if (currentUser.id === userObject.id) {
      currentUser.likes= likes;
    }
  
    localStorage.setItem("name", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    mostrarLikes(currentUser.likes);

  }
  
  
  static getStorage(): any {
    const storage =
      localStorage.getItem("name") === null
        ? []
        : JSON.parse(localStorage.getItem("name") || "{}");
    return storage;
  }

  static getUser(storage: Object, userElement: HTMLElement): any {
    //Getting the userNickname in the HTML
    const userNickName = userElement.innerHTML;
    //Getting the user information
    for (const user of storage) {
      if (user.name === userNickName) {
        console.log(`AJA! ${user.name} coincide con el elemento HTML ${userNickName}!`);
        return user;
      }
    }
  }
}
