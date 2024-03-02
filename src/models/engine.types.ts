export enum EngineTypes {
    /**
     * @remarks
     * This is the list of all the posible engines
     * 
     * @param {string} LOCALSTORAGE - This engine uses the browsers localstorage as database
     * @param {string} FILESTORAGE - This engine uses a file as database
     * @param {string} CODESTORAGE - This engine uses a file as database
     */

    LOCALSTORAGE = "localstorage",
    FILESTORAGE = "filestorage",
    CODESTORAGE = "codestorage",
}