import { IDocument } from "../documents/document.interface";

export interface IFilter<T> {
    /**
    * @remarks
    * The datatype for a document interface implementing the @type {IBase}
    * 
    * @param @or - This is a filter to fetch data that matches any of the provided parameters
    * @param @not - This is a filter to fetch data that does not the specified document value
    * @param @like - This is a filter to fetch data that is like the specified document value
    * @param @includes - This is a filter to fetch data that the specified document value is within in the provided array
    * @param @has - This is a filter to fetch data that the specified provided value is within the document array
    * 
    * @type {T} - This is the type of the document
    * @type {IDocument} - This is the document type
    */
   
    '@or': Partial<IDocument<T>>;
    '@not': Partial<IDocument<T>>;
    '@like': {[P in keyof T]?: any },
    '@includes': {[P in keyof T]?: [any] },
    '@has': {[P in keyof T]?: any }
};
