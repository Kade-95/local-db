import { IStorage } from "../models/storage.type";

export class CodeStorage implements IStorage {
    /**
     * @remarks
     * This is a volatile version of a localStorage
     * To be used for testing in the absence of the actual localStorage
     * 
     * @param {any} data - This is the data stored
     * @param {number} length - This is the number of items stored
     */

    private data: any = {};

    get length() {
        /**
         * @remarks
         * The number of items stored
         * 
         * @returns {number} - Number of items stored
         */
        return Object.keys(this.data).length;
    }

    constructor() {}

    setItem(key: string, value: string) {
        /**
         * @remarks
         * Saves an item in the store
         * 
         * @param {string} key - This is the key of the item to be stored
         * @param {string} value - This is value of the item to be stored
         */

        this.data[key] = value == 'null' ? undefined : value;
    }

    getItem(key: string) {
        /**
         * @remarks
         * Finds an item in the store
         * 
         * @param {string} key - This is the key of the item to find
         * 
         * @returns {string} - The value of the item stored with @param key
         */

        return this.data[key] || null;
    }

    clear() {
        /**
         * @remarks
         * Deletes all the items in the store
         */

        this.data = {};
    }

    removeItem(key: string) {
        /**
         * @remarks
         * Deletes an item in the store
         * 
         * @param {string} key - This is the key of the item to be deleted
         */

        delete this.data[key];
    }

    key(index: number) {
        /**
         * @remarks
         * Gets the key of the item in the specified index
         * 
         * @param {string} index - This is the index of the item
         * 
         * @returns {string} - The key of the item
         */

        return Object.keys(this.data)[index];
    }
}