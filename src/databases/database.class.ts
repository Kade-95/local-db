import { Collection } from "..";
import { ICollection } from "../collections/collection.interface";
import { CollectionOption } from "../collections/collection.options";
import { findDatabase } from "../utils/find.database";
import { removeDatabase } from "../utils/remove.database";
import { saveDatabase } from "../utils/save.database";

export class Database {
    /**
    * @remarks
    * Creates a single database
    *
    * @param value - This private member sets or gets the currently stored data
    * @param name - This is the name of the database
    */

    private get value() {
        /**
        * @remarks
        * A get function used to fetch the current state of the database
        */
        return findDatabase(this.name);
    }

    private set value(value: ICollection<any>[]) {
        /**
        * @remarks
        * A set function used to set the current state of the database
        */
        saveDatabase(this.name, value);
    }

    get collections() {
        /**
        * @remarks
        * A get function used to fetch the current state of the data publicly
        *
        */
        return this.value;
    }


    constructor(public name: string) {
        if (!this.value) this.value = [];
    }

    createCollection<T>(name: string, options?: CollectionOption<T>) {
        /**
        * @remarks
        * Creates a single collection attatched to this database
        *
        * @param name - This is the name of the collection 
        * @param options - This is an optional settings for the collection
        * 
        * @returns {Collection<T>} - A new Collection
        */

        const collection = new Collection(name, { database: this, ...options });        
        return collection;
    }

    getCollections() {
        /**
        * @remarks
        * Gets all the collections in the database
        *
        * @returns {Collection<any>[]} - A list of collections in the database
        */
        return this.value;
    }

    getCollection<T>(name: string) {
        /**
        * @remarks
        * Fetches the collection with the name in the database
        *
        * @param name - This is the name of the collection 
        * 
        * @returns {Collection<T>} - The collection with the name in the database
        */

        return this.value.find(v => v.name == name) as Collection<T> | undefined;
    }

    deleteCollection(name: string) {
        /**
        * @remarks
        * Deletes collection with name in database
        *
        * @param name - This is the name of the collection 
        */

        const collection = new Collection(name);
        collection.drop();
    }

    empty() {
        /**
        * @remarks
        * Empty database collection list
        */

        this.value = [];
    }

    drop() {
        /**
        * @remarks
        * Delete database
        */

        removeDatabase(this.name);
    }
}