import { CodeStorage } from "..";
import { ICollection } from "../collections/collection.interface";
import { EngineTypes } from "../models/engine.types";
import { Entity } from "../models/entity.interface";
import { IStorage } from "../models/storage.type";
import { StoreTypes } from "../models/types.store";
import { FileStorage } from "../storage/file-storage.class";
import { LocalStorage } from "../storage/local-storage.class copy";


export class Engine {
    storage: IStorage = new CodeStorage();

    constructor(
        public type: EngineTypes = EngineTypes.CODESTORAGE
    ) {
        this.init();
    }   

    init() {
        if (this.type === EngineTypes.LOCALSTORAGE) {
            this.storage = new LocalStorage();
        }
        else if (this.type === EngineTypes.FILESTORAGE) {
            this.storage = new FileStorage();
        }        
    }

    fromEntity<T>(entity: Entity<T>){
        /**
         * @remarks
         * Transforms an entity to a list
         * 
         * @param {Entity<T>} entity - This is the entity to be transformed
         * 
         * @type {T} - This is the type of the items in the list
         * 
         * @returns {Arrya<T>[]} - The list of items of @type {T}
         */
        
        return Object.values(entity);
    }

    toEntity<T>(list: T[], key: string) {
        /**
         * @remarks
         * This transform a list into an entity
         * 
         * @param {Array<T>} list - This is the list to be transformed
         * @param {string} key - This is the identifying attribute for the entity
         * 
         * @type {T} - This is the type of the items in the list
         * 
         * @returns {Entity<T>} - An entity created from the @param list
         */
    
        const entity: Entity<T> = list.reduce((acc, red) => {
            return { ...acc, [(red as any)[key]]: red };
        }, {});
    
        return entity;
    }

    saveCollection<T>(collection: ICollection<T>, database?: string) {
        /**
         * @remarks
         * This saves the collection into localStorage
         * 
         * @param {string} name - This is the name of the collection
         * @param {any} value - This is the current state of the collection
         * @param {string} database - This is the database the collection belongs to
         */
        const { name } = collection;
    
        if (!!database) {
            const db = this.toEntity(this.findDatabase(database), 'name');
            db[name] = collection;
            this.saveDatabase(database, this.fromEntity(db));
        }
        else {
            this.storage.setItem(`${StoreTypes.COLLECTION}[${name}]`, JSON.stringify(collection));
        }
    }

    findCollection<T>(name: string, database?: string) {
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
            const data = this.findDatabase(database);            
            const db = this.toEntity(data, 'name');
            value = db[name];
        }
        else {
            try {
                value = JSON.parse(this.storage.getItem(`${StoreTypes.COLLECTION}[${name}]`) as string);
            } catch (error) {
                value = undefined;
            }
        }
    
        return value;
    }

    removeCollection(name: string, database?: string) {
        /**
         * @remarks
         * This deletes the collection from localStorage
         * 
         * @param {string} name - This is the name of the collection
         * @param {string} database - This is the database the collection belongs to
         */
    
        if (!!database) {
            const db = this.toEntity(this.findDatabase(database), 'name');
            delete db[name];
            this.saveDatabase(database, this.fromEntity(db));
        }
        else {
            this.storage.removeItem(`${StoreTypes.COLLECTION}[${name}]`);
        }
    }

    saveDatabase(name: string, value: ICollection<any>[] = []) {
        /**
         * @remarks
         * This saves the database into localStorage
         * 
         * @param {string} name - This is the name of the database
         * @param {any} value - This is the current state of the database
         */
        this.storage.setItem(`${StoreTypes.DATABASE}[${name}]`, JSON.stringify(value));
    }

    findDatabase(name: string) {
        /**
         * @remarks
         * Get a database from localStorage
         * 
         * @param {string} name - This is the name of the collection
         * 
         * @returns {Collection<any>[]} - The list of collections for the database
         */

        const parsedName = `${StoreTypes.DATABASE}[${name}]`;
        const data = this.storage.getItem(parsedName);
        
        let value: ICollection<any>[] = [];
    
        try {
            value = JSON.parse(data as string) as [];
        } catch (error) {
            value = [];
        }
    
        return value;
    }

    removeDatabase(name: string) {
        /**
         * @remarks
         * This deletes the database from localStorage
         * 
         * @param {string} name - This is the name of the collection
         */
    
        this.storage.removeItem(`${StoreTypes.DATABASE}[${name}]`);
    }
}