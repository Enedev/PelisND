import { userArr, lists, input, setUserArr } from "./user.js";
import StorageX from "./storagex.js";
export let a = userArr;
export let arrItems = [];
let arrUsers = [];
export class LoginUi {
    static displayData() {
        a = userArr;
        let displayData = a.map((item, index) => `
        <div class="users">
            <div>
                <p class="user-item">${item.name}</p>
            </div>
            <span class = "remove"><img src="./img/biggertrash.png"></span>
        </div>
        `);
        lists.innerHTML = (displayData).join(" ");
        //This array will help us delete de user profiles
        arrItems = Array.from(document.querySelectorAll('.users .remove'));
        //This array will help us to give the information to the users
        arrUsers = Array.from(document.querySelectorAll('.user-item'));
        //Adding event listener to delete user
        arrItems.forEach(e => {
            e.addEventListener('click', () => {
                const index = arrItems.indexOf(e);
                this.removeArrayUser(index);
                this.removeUser(e.parentElement);
            });
        });
        //Adding event listener to the user profiles
        arrUsers.forEach(user => {
            user.addEventListener('click', () => {
                const storage = StorageX.getStorage();
                const selectedUser = StorageX.getUser(storage, user);
                //Adding selected user
                StorageX.addCurrentUser(selectedUser);
                // Redirect to another HTML file
                window.location.href = 'http://127.0.0.1:5500/PelisND/movies.html';
            });
        });
    }
    static removeUser(element) {
        element.innerHTML = '';
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
    static clearInput() {
        input.value = "";
    }
    static removeArrayUser(index) {
        setUserArr(index);
    }
}
