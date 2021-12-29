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

    constructor(private data: T, private options?: DocumentOptions<T>) {
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
        if (!this.options?.collection) throw new Error('Document does not have a collection');
        this.options?.collection.insertOne(this.value);

        return this;
    }

    update(data: Partial<IDocument<T>>) {
        /**
         * Updates the document with the @param data
         * 
         * @param {Partial<IDocument<T>>} data the new partial state of the document
         *
         */

        if (!this.options?.collection) throw new Error('Document does not have a collection');
        this.value = this.options.collection.updateOne({ _id: this.value._id } as any, data) as IDocument<T>;

        return this;
    }

    remove() {
        /**
         * Deletes the document from the collection
         *
         */

        if (!this.options?.collection) throw new Error('Document does not have a collection');
        this.options?.collection.removeOne({ _id: this.value._id } as any);
        this.value = this.options.collection.findOne({ _id: this.value._id } as any) as IDocument<T>;

        return this;
    }
}