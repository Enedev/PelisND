import {  User, setUserArr} from "./user.js"
import StorageX from "./storagex.js"

export let userArr: User[] = StorageX.getStorage();
export let a = userArr

export let arrItems: HTMLElement[] = []
let arrUsers: HTMLElement[] = []

//All of this is for the login ui
const form = document.querySelector("[data-form]")  as HTMLFormElement;
const lists = document.querySelector("[data-lists]") as HTMLDListElement;
const input = document.querySelector("[data-input]") as HTMLInputElement;

if (form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(input.value)
        if (input.value.length > 10 || input.value.length == 0){
            alert("Cabezipolla")
            LoginUi.clearInput();
        } else{
            const id = Math.random() * 1000000;
            const user = new User( id, input.value);
            userArr.push(user)
            LoginUi.displayData();
            LoginUi.clearInput();
            StorageX.addUserStorage(userArr);
            console.log(userArr);
        }
        
    });
}


export class LoginUi {

    static displayData(): any{
        a = userArr

        let displayData = a.map((item, index) => `
        <div class="users">
            <div>
                <p class="user-item">${item.name}</p>
            </div>
            <span class = "remove"><img src="./img/biggertrash.png"></span>
        </div>
        `);
        if (lists){
            lists.innerHTML = (displayData).join(" ");
        }

        //This array will help us delete de user profiles
        arrItems = Array.from(document.querySelectorAll('.users .remove'))
        //This array will help us to give the information to the users
        arrUsers = Array.from(document.querySelectorAll('.user-item'))

        //Adding event listener to delete user
        arrItems.forEach(e => {
            e.addEventListener('click', () => {
                const index = arrItems.indexOf(e)
                this.removeArrayUser(index)
                this.removeUser(e.parentElement)
            })
        })

        //Adding event listener to the user profiles
        arrUsers.forEach(user => {
            user.addEventListener('click', () => {
                const storage = StorageX.getStorage()
                const selectedUser = StorageX.getUser(storage, user)
                //Adding selected user
                StorageX.addCurrentUser(selectedUser)
                // Redirect to another HTML file
                window.location.href = 'http://127.0.0.1:5500/PelisND/movies.html'
            })
        })
    }
    static removeUser(element: any){

        element.innerHTML = ''
        /* lists.addEventListener("click", (e: MouseEvent) =>{
            if((e.target as Element).classList.contains("remove")){
                (e.target as HTMLElement).parentElement?.remove();

                console.log("removed")
            }
            console.log((e.target as HTMLElement).dataset.id) */
            //console.log(btnId);
            
            //LoginUi.removeArrayUser(btnId);
        //})


    }
    static clearInput(){
        input.value ="";
    }
    static removeArrayUser(index: number){
        setUserArr(index)     
    }
}

window.addEventListener("DOMContentLoaded", () =>{
    LoginUi.displayData();
})