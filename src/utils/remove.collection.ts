import { findDatabase } from "./find.database";
import { fromEntity } from "./from.entity";
import { saveDatabase } from "./save.database";
import { toEntity } from "./to.entity";
import { StoreTypes } from "./types.store";

export function removeCollection(name: string, database?: string) {
    /**
     * @remarks
     * This deletes the collection from localStorage
     * 
     * @param {string} name - This is the name of the collection
     * @param {string} database - This is the database the collection belongs to
     */

    if (!!database) {
        const db = toEntity(findDatabase(database), 'name');
        delete db[name];
        saveDatabase(database, fromEntity(db));
    }
    else {
        localStorage.removeItem(`${StoreTypes.COLLECTION}[${name}]`);
    }
}