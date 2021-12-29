export type DocumentKeys<T> = {
    /**
    * @remarks
    * The datatype for all the keys in a document
    * 
    * @type {T} - This is the type of the document
    */
    [P in keyof T]?: string;
}