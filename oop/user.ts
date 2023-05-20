import { LoginUi } from "./loginUi.js";
import StorageX from "./storagex.js";

export const form = document.querySelector("[data-form]")  as HTMLFormElement;
export const lists = document.querySelector("[data-lists]") as HTMLDListElement;
export const input = document.querySelector("[data-input]") as HTMLInputElement;

export let userArr: User[] = StorageX.getStorage();

export function setUserArr(index: number){
    userArr = userArr.filter(e => e !== userArr[index]) 
    StorageX.addUserStorage(userArr)
    LoginUi.displayData()
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(input.value)
    if (input.value.length > 10 || input.value.length == 0){
        alert("Cabezipolla")
        LoginUi.clearInput();
    } else{
        const id = Math.random() * 1000000;
        const user: User = { id, name: input.value};
        userArr.push(user)
        LoginUi.displayData();
        LoginUi.clearInput();
        StorageX.addUserStorage(userArr);
        console.log(userArr);
    }
    
});

export class User{
    id: number;
    name: string;

    constructor(id:number, name:string){
        this.id = id;
        this.name = name;
    }
}

window.addEventListener("DOMContentLoaded", () =>{
    LoginUi.displayData();
})
