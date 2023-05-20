import { LoginUi } from "./loginUi.js";
import StorageX from "./storagex.js";
export const form = document.querySelector("[data-form]");
export const lists = document.querySelector("[data-lists]");
export const input = document.querySelector("[data-input]");
export let userArr = StorageX.getStorage();
export function setUserArr(index) {
    userArr = userArr.filter(e => e !== userArr[index]);
    StorageX.addUserStorage(userArr);
    LoginUi.displayData();
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(input.value);
    if (input.value.length > 10 || input.value.length == 0) {
        alert("Cabezipolla");
        LoginUi.clearInput();
    }
    else {
        const id = Math.random() * 1000000;
        const user = { id, name: input.value };
        userArr.push(user);
        LoginUi.displayData();
        LoginUi.clearInput();
        StorageX.addUserStorage(userArr);
        console.log(userArr);
    }
});
export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
window.addEventListener("DOMContentLoaded", () => {
    LoginUi.displayData();
});
