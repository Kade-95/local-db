import { ICollection } from "../collections/collection.interface";
import { StoreTypes } from "./types.store";

export function saveDatabase(name: string, value: ICollection<any>[]) {
    /**
     * @remarks
     * This saves the database into localStorage
     * 
     * @param {string} name - This is the name of the database
     * @param {any} value - This is the current state of the database
     */
    localStorage.setItem(`${StoreTypes.DATABASE}[${name}]`, JSON.stringify(value));
}