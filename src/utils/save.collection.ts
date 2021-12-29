import { ICollection } from "../collections/collection.interface";
import { findDatabase } from "./find.database";
import { fromEntity } from "./from.entity";
import { saveDatabase } from "./save.database";
import { toEntity } from "./to.entity";
import { StoreTypes } from "./types.store";

export function saveCollection<T>(name: string, value: ICollection<T>, database?: string) {
    /**
     * @remarks
     * This saves the collection into localStorage
     * 
     * @param {string} name - This is the name of the collection
     * @param {any} value - This is the current state of the collection
     * @param {string} database - This is the database the collection belongs to
     */

    if (!!database) {
        const db = toEntity(findDatabase(database), 'name');
        db[name] = value;
        saveDatabase(database, fromEntity(db));
    }
    else {
        localStorage.setItem(`${StoreTypes.COLLECTION}[${name}]`, JSON.stringify(value));
    }
}