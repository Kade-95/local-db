import { Entity } from "../models/entity.interface";

export function toEntity<T>(list: T[], key: string) {
    /**
     * @remarks
     * This transform a list into an entity
     * 
     * @param {Array<T>} list - This is the list to be transformed
     * @param {string} key - This is the identifying attribute for the entity
     * 
     * @type {T} - This is the type of the items in the list
     * 
     * @returns {Entity<T>} - An entity created from the @param list
     */

    const entity: Entity<T> = list.reduce((acc, red) => {
        return { ...acc, [(red as any)[key]]: red };
    }, {});

    return entity;
}