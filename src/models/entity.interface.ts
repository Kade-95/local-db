export interface Entity<T> {
    /**
    * @remarks
    * This datatype transforms a list into an Object with a specified key
    * 
    * @type {T} - This is the type of each object in the entity
    */

    [id: string]: T;
}