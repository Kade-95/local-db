import { ICollection } from "../collections/collection.interface";
import { findDatabase } from "./find.database";
import { toEntity } from "./to.entity";
import { StoreTypes } from "./types.store";

export function findCollection<T>(name: string, database?: string) {
    /**
     * @remarks
     * Get a collection from localStorage
     * 
     * @param {string} name - This is the name of the collection
     * @param {string} database - This is the name of the database the collection belongs to
     * 
     * @returns {ICollection<T>} - The list of documents for the collection
     */
    let value: ICollection<T> | undefined;

    if (!!database) {
        const db = toEntity(findDatabase(database), 'name');
        value = db[name];
    }
    else {
        try {
            value = JSON.parse(localStorage.getItem(`${StoreTypes.COLLECTION}[${name}]`) as string);
        } catch (error) {
            value = undefined;
        }
    }

    return value;
}