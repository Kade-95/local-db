export interface IBase {
    /**
    * @remarks
    * This datatype is the base off all items
    * 
    * @param {string} _id - This is the identifier of a item
    * @param {Date} createdAt - This is the date this item is created
    * @param {Date} updatedAt - This is the date this item is updated last
    */
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
}