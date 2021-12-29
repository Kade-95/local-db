import { Entity } from "../models/entity.interface";

export function fromEntity<T>(entity: Entity<T>){
    /**
     * @remarks
     * Transforms an entity to a list
     * 
     * @param {Entity<T>} entity - This is the entity to be transformed
     * 
     * @type {T} - This is the type of the items in the list
     * 
     * @returns {Arrya<T>[]} - The list of items of @type {T}
     */
    
    return Object.values(entity);
}