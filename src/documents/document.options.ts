import { Collection } from "../collections/collection.class";

export interface DocumentOptions<T> {
    /**
    * @remarks
    * The datatype for the options for the creation of a document
    *
    * @param {Collection<T>} collection - This is the collection that the document belongs to
    * @param {boolean} timestamp - This flag is used to determine if the history of the document is to be recored
    * 
    * @type {T} - This is the type of the document
    */

    collection?: Collection<T>;
    timestamp?: boolean;
}