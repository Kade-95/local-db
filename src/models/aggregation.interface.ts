import { IDocument } from "../documents/document.interface";

export interface IAggragtion<T> {
    /**
    * @remarks
    * The datatype for a document interface implementing the @type {IBase}
    * 
    * @type {T} - This is the type of the document
    * @type {IDocument} - This is the document type
    */
   
    not?: Partial<IDocument<T>>;
    like?: {[P in keyof T]?: string }
};
