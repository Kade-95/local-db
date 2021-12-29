import { StoreTypes } from "./types.store";

export function removeDatabase(name: string) {
    /**
     * @remarks
     * This deletes the database from localStorage
     * 
     * @param {string} name - This is the name of the collection
     */

    localStorage.removeItem(`${StoreTypes.DATABASE}[${name}]`);
}