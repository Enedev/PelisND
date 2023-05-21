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

export class User{
    id: number;
    name: string;
    selectedGenres?: string[];

    constructor(id:number, name:string){
        this.id = id;
        this.name = name;
        this.selectedGenres = []; 
    }

    public setGenre(genre:string){  
        if(this.selectedGenres) {
            this.selectedGenres.push(genre);
        }
        console.log("Estos son los generos del Usuario", this.selectedGenres)

    }
}
