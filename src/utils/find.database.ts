import { ICollection } from "../collections/collection.interface";
import { StoreTypes } from "./types.store";

export function findDatabase(name: string) {
    /**
     * @remarks
     * Get a database from localStorage
     * 
     * @param {string} name - This is the name of the collection
     * 
     * @returns {Collection<any>[]} - The list of collections for the database
     */

    const data = localStorage.getItem(`${StoreTypes.DATABASE}[${name}]`);
    let value: ICollection<any>[] = [];

    try {
        value = JSON.parse(data as string) as [];
    } catch (error) {
        value = [];
    }

    return value;
}