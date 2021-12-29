import { IBase } from "../models/base.interface";

export type IDocument<T> = (
    /**
    * @remarks
    * The datatype for a document interface implementing the @type {IBase}
    * 
    * @type {T} - This is the type of the document
    * @type {IBase} - This is the base of the document
    */
   
    IBase & T
);