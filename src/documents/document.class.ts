import { IDocument } from "./document.interface";
import { v4 as uuidV4 } from "uuid";
import { DocumentOptions } from "./document.options";

export class Document<T>{
    /**
     * Creates a single document
     * 
     * @param data - This is the actual data used for the document creation
     * @param value - This is the formatted value of the data
     * @param {DocumentOptions<T>} options - This is the options utilized in the creation of a docuement
     *
     * @beta
     */

    value!: IDocument<T>;

    constructor(private data: T, private options: DocumentOptions<T>) {
        this.value = { _id: uuidV4(), ...this.data };

        if (this.options?.timestamp) {
            this.value.createdAt = !!this.value.createdAt ? this.value.createdAt : new Date();
            this.value.updatedAt = !!this.value.updatedAt ? this.value.updatedAt : new Date();
        }
    }

    save() {
        /**
         * Saves the current state of the document
         * 
         */
        this.options.collection.insertOne(this.value);
    }

    update(data: Partial<IDocument<T>>) {
        /**
         * Updates the document with the @param data
         * 
         * @param {Partial<IDocument<T>>} data the new partial state of the document
         *
         */

        this.options?.collection.updateOne(this.value, data);
    }

    delete() {
        /**
         * Deletes the document from the collection
         *
         */

        this.options?.collection.removeOne(this.value);
    }

    static isValid<T>(doc: IDocument<T>) {
        return !!doc._id;
    }

    static from<T>(data: T, options: DocumentOptions<T>) {
        return new Document(data, options);
    }
}