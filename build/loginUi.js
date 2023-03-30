import { userArr, lists, input, setUserArr } from "./user.js";
export let a = userArr;
export let arrItems = [];
export class LoginUi {
    static displayData() {
        a = userArr;
        let displayData = a.map((item, index) => `
        <div class="users">
            <p>${item.name}</p>
            <span class = "remove">🗑️</span>
        </div>
        `);
        lists.innerHTML = (displayData).join(" ");
        arrItems = Array.from(document.querySelectorAll('.users .remove'));
        console.log(arrItems);
        arrItems.forEach(e => {
            e.addEventListener('click', () => {
                const index = arrItems.indexOf(e);
                console.log(index);
                this.removeArrayUser(index);
                this.removeUser(e.parentElement);
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
