import { IDocument } from "../documents/document.interface";
import { IFilter } from "./filter.interface";

export type IQuery<T> = (
    /**
    * @remarks
    * The datatype for a document interface implementing the @type {IBase}
    * 
    * @type {T} - This is the type of the document
    * @type {IDocument} - This is the document type
    */
   
    Partial<IDocument<T> | IFilter<IDocument<T>>> | any
);
