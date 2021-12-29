import { Database } from "../databases/database.class";
import { DocumentKeys } from "../documents/document.keys";

export interface CollectionOption<T> {
    /**
    * @remarks
    * The datatype for the options for the creation of a document
    *
    * @param {Database<T>} database - This is the database that the collection belongs to
    * @param {boolean} timestamp - This flag is used to determine if the history of the document is to be recored
    * @param {DocumentKeys<T>} required - This is a list of all the required items for each document in collection
    * @param {DocumentKeys<T>} unique - This is a list of all the unique items for each document in collection
    * 
    * @type {T} - This is the type of the document
    */

    database?: Database,
    timestamp?: boolean;
    required?: DocumentKeys<T>;
    unique?: DocumentKeys<T>;
}