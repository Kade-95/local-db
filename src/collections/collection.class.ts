import { Document } from "../documents/document.class";
import { IDocument } from "../documents/document.interface";
import { DocumentOptions } from "../documents/document.options";
import { findCollection } from "../utils/find.collection";
import { fromEntity } from "../utils/from.entity";
import { removeCollection } from "../utils/remove.collection";
import { saveCollection } from "../utils/save.collection";
import { toEntity } from "../utils/to.entity";
import { ICollection } from "./collection.interface";
import { CollectionOption } from "./collection.options";
import { v4 as uuidV4 } from "uuid";


export class Collection<T>{

    /**
    * @remarks
    * Creates a single collection either attatched to a database or as standalone
    *
    * @param name - This is the name of the collection 
    * @param value - This private member sets or gets the currently stored data privately
    * @param list - This retrives the current state of the Collection privately
    * @param entity - This retrives the current state of the Collection as an @type {Entity}
    * @param data - This retrives the current state of the Collection publicly
    * @param options - This is an optional settings for the collection
    * 
    * @type {T} - This is the schema of the documents of the collection
    */

    private documentOptions: DocumentOptions<T> = {
        collection: this,
        timestamp: this.options?.timestamp
    };

    private get value() {
        /**
        * @remarks
        * A get function used to fetch the current state of the collection
        */
        return findCollection<T>(this.name, this.options?.database?.name) as ICollection<T>;
    }

    private set value(value: ICollection<T>) {
        /**
        * @remarks
        * A set function used to update the current state of the collection
        *
        */
        value = { ...value, updatedAt: new Date() };
        saveCollection(this.name, value, this.options?.database?.name);
    }

    get entity() {
        /**
        * @remarks
        * A get function used to fetch the current state of the collection as an entity
        */
        return toEntity(this.documents, '_id');
    }

    get documents() {
        /**
        * @remarks
        * A get function used to fetch the current state of the collection publicly
        *
        */
        return this.value?.documents;
    }

    get length() {
        /**
        * @remarks
        * A get function used to fetch the current number of documents in a collection
        *
        */
        return this.documents.length;
    }

    get createdAt() {
        /**
        * @remarks
        * A get function used to fetch the time collection was created
        *
        */
        return this.value.createdAt;
    }

    get updatedAt() {
        /**
        * @remarks
        * A get function used to fetch the time collection was updated
        *
        */
        return this.value.updatedAt;
    }

    constructor(
        public name: string,
        private options?: CollectionOption<T>
    ) {
        if (!this.value) {
            const value: ICollection<T> = { _id: uuidV4(), name: this.name, documents: [] };
            if (this.options?.timestamp) {
                value.createdAt = !!value.createdAt ? value.createdAt : new Date();
                value.updatedAt = !!value.updatedAt ? value.updatedAt : new Date();
            }

            this.value = value
        };
    }

    find(query?: Partial<IDocument<T>>) {
        /**
        * @remarks
        * This is used to query a collection to fetch the matching list of documents
        * 
        * @param {Partial<IDocument<T>>} query this is the query that the defines the search parameters
        *
        * @returns {IDocument<T>[]} - The found matched documents
        */
        return query
            ? this.documents.filter(v => {
                let flag: boolean = false;

                for (let k in v) {
                    if ((query as any)[k]) {
                        flag = (v as any)[k] === (query as any)[k];

                        if (!flag) return;
                    }
                }
                return flag;
            })
            : this.documents;
    }

    findOne(query?: Partial<IDocument<T>>) {
        /**
       * @remarks
       * This is used to query a collection to fetch the first matched document
       * 
       * @param {Partial<IDocument<T>>} query this is the query that the defines the search parameters
       *
       * @returns {IDocument<T>} - The matched document if any
       */
        return query
            ? this.documents.find(v => {
                let flag: boolean = false;

                for (let k in v) {
                    if ((query as any)[k]) {
                        flag = (v as any)[k] === (query as any)[k];

                        if (!flag) return;
                    }
                }
                return flag;
            })
            : this.documents[0];
    }

    insert(list: T[]) {
        /**
       * @remarks
       * This is used to insert a list of documents into a collection
       * 
       * @param {T[]} list this is the query that the defines the search parameters
       *
       * @returns {IDocument<T>[]} A transformed version of the list
       */

        const docs: IDocument<T>[] = [];
        for (let data of list) {
            docs.push(new Document<T>(data, this.documentOptions).value);
        }

        Collection.verifyMultipleRequired(this, docs);
        Collection.verifyMultipleUnique(this, docs);

        this.value = { ...this.value, documents: [...this.documents, ...docs] };
        return docs;
    }

    insertOne(data: T) {
        /**
        * @remarks
        * This is used to insert a list of documents into a collection
        * 
        * @param {T} data this is the query that the defines the search parameters
        *
        * @returns {IDocument<T>} A transformed version of the data
        */

        const doc = (new Document<T>(data, this.documentOptions).value);
        Collection.verifyRequired(this, data);
        Collection.verifyUnique(this, data);

        this.value = { ...this.value, documents: [...this.documents, doc] };
        return doc;
    }

    update(query: Partial<IDocument<T>>, doc: Partial<T>) {
        /**
        * @remarks
        * This is used to update a list of documents in a collection
        * 
        * @param {Partial<IDocument<T>>} query - this is the query that the defines the search parameters for the documents to be updated
        * @param {Partial<T>} doc - This is the new state of the documents to be updated
        *
        * @returns {IDocument<T>[]} - The affected documents in the collection
        */

        const list: IDocument<T>[] = this.find(query).map(found => ({ ...found, ...doc }));
        Collection.verifyMultipleRequired(this, list);
        Collection.verifyMultipleUnique(this, list);

        const { entity } = this;
        for (let found of list) {
            entity[found._id] = found;
        }

        this.value = { ...this.value, documents: fromEntity(entity) };
        return list;
    }

    updateOne(query: Partial<IDocument<T>>, doc: Partial<T>) {
        /**
        * @remarks
        * This is used to update a list of documents in a collection
        * 
        * @param {Partial<IDocument<T>>} query - this is the query that the defines the search parameters for the document to be updated
        * @param {Partial<T>} doc - This is the new state of the document to be updated
        *
        * @returns {IDocument<T>} - The affected document in the collection
        */

        let found = this.findOne(query);

        if (found) {
            found = { ...found, ...doc };
            Collection.verifyRequired(this, found);
            Collection.verifyUnique(this, found);

            const { entity } = this;
            entity[found._id] = found;

            this.value = { ...this.value, documents: fromEntity(entity) };
        }

        return found;
    }

    remove(query: Partial<IDocument<T>>) {
        /**
        * @remarks
        * This is used to delete a list of documents in a collection
        * 
        * @param {Partial<IDocument<T>>} query - this is the query that the defines the search parameters for the documents to be deleted
        *
        * @returns {IDocument<T>[]} - The affected documents in the collection
        */

        const list = this.find(query) as IDocument<T>[];
        const { entity } = this;

        for (let found of list) {
            delete entity[found._id];
        }

        this.value = { ...this.value, documents: fromEntity(entity) };
        return list;
    }

    removeOne(query: Partial<IDocument<T>>) {
        /**
        * @remarks
        * This is used to delete a document in a collection
        * 
        * @param {Partial<IDocument<T>>} query - this is the query that the defines the search parameters for the document to be deleted
        *
        * @returns {IDocument<T>} - The affected document in the collection
        */

        const found = this.findOne(query);

        if (found) {
            const { entity } = this;
            delete entity[found._id];
            this.value = { ...this.value, documents: fromEntity(entity) };
        }

        return found;
    }

    drop() {
        /**
        * @remarks
        * This is used to delete a collection
        */
        removeCollection(this.name, this.options?.database?.name);
    }

    empty() {
        /**
       * @remarks
       * This is used to empty a collection
       */

        this.value = { ...this.value, documents: [] };
    }

    public static from<T>(name: string, docs: IDocument<T>[]) {
        /**
         * @remarks
         * Creates a new Collection with @param name and inserts @param docs
         *
         * @param {string} name - This is the name of the collection to be created
         * @param {Array<IDocument>} docs - This is the list of documents to be inserted
         * 
         * @returns {Collection<T>} - A collection 
         */

        const collection = new Collection<T>(name);
        collection.insert(docs);

        return collection;
    }

    public static clone<T>(collection: Collection<T>, name: string) {
        /**
        * @remarks
        * Creates a new Collection from an existing one @param collection with a new name @param name
        * 
        * @param {Collection<T>} collection - This is the collection to be cloned
        * @param {string} name - This is the name of the collection to be created
        * 
        * @returns {Collection<T>} - A collection 
        */

        return Collection.from(name, collection.documents);
    }

    public static verifyRequired<T>(collection: Collection<T>, data: Partial<IDocument<T>>) {
        /**
         * @remarks
         * Verifies if all required items in @param collection are provided in @param data
         *
         * @param {Collection<T>} collection - This is the collection to be verified with
         * @param {Partial<IDocument<T>>} data - This is the document to verify
         * 
         * @throws {Error} - An error if some of the required items are not provided in the @param data
         */

        const required: string[] = [];

        if (collection.options?.required) {
            for (let i in collection.options.required) {
                if (!data[i]) required.push(collection.options?.required[i] as string);
            }
        }

        if (required.length) throw new Error(required.join('\n').trim());
    }

    public static verifyUnique<T>(collection: Collection<T>, data: Partial<IDocument<T>>) {
        /**
         * @remarks
         * Verifies if all unique items in @param collection doesn't have duplicates in @param data
         *
         * @param {Collection<T>} collection - This is the collection to be verified with
         * @param {Partial<IDocument<T>>} data - This is the document to verify
         * 
         * @throws {Error} - An error if some of the unique items have duplicates in @param data
         */

        const unique: string[] = [];

        if (collection.options?.unique) {
            for (let i in collection.options.unique) {
                if (collection.documents.find(d => (d[i] == data[i] && d._id != data._id)))
                    unique.push(collection.options?.unique[i] as string);
            }
        }

        if (unique.length) throw new Error(unique.join('\n').trim());
    }

    public static verifyMultipleRequired<T>(
        collection: Collection<T>,
        list: Partial<IDocument<T>>[]
    ) {
        /**
         * @remarks
         * Verifies if all required items in @param collection are provided in all documents in @param list
         *
         * @param {Collection<T>} collection - This is the collection to be verified with
         * @param {Partial<IDocument<T>>} list - This is the list of documents to verify
         * 
         * @throws {Error} - An error if some of the required items are not provided in any of the documents in the @param list
         */


        const required: string[] = [];

        if (collection.options?.required) {
            for (let i in collection.options.required) {
                for (let j in list) {
                    if (!list[j][i])
                        required.push(collection.options?.required[i] as string);
                }
            }
        }

        if (required.length) throw new Error(required.join('\n').trim());
    }

    public static verifyMultipleUnique<T>(
        collection: Collection<T>,
        list: Partial<IDocument<T>>[]
    ) {
        /**
         * @remarks
         * Verifies if all unique items in @param collection doesn't have duplicates in @param list
         *
         * @param {Collection<T>} collection - This is the collection to be verified with
         * @param {Partial<IDocument<T>>} list - This is the list of documents to verify
         * 
         * @throws {Error} - An error if some of the unique items have duplicates in any of documents in the @param list
         */
        const unique: string[] = [];

        if (collection.options?.unique) {
            for (let i in collection.options.unique) {
                for (let j in list) {
                    if (
                        collection.documents.find(d => (d[i] == list[j][i] && d._id != list[j]._id)) ||
                        list.find((d, k) => d[i] == list[j][i] && k != parseInt(j))
                    )
                        unique.push(collection.options?.unique[i] as string);
                }
            }
        }

        if (unique.length) throw new Error(unique.join('\n').trim());
    }
}