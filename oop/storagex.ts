export default class StorageX {

    static addUserStorage(userArray: object[]) {
        let storage = localStorage.setItem("name", JSON.stringify(userArray));
        return storage;
    }

    static getStorage(): any {
        const storage = localStorage.getItem("name") === null?
        [] : JSON.parse(localStorage.getItem("name") || '{}');
        return storage;
      }
}   