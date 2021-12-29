// import { Storage } from "./../../src/storage/storage.class";
// // import * as chai from "chai";
// import { Database } from "../../src";
// import { Sample } from "../../src/models/sample.interface";

// // const expect = chai.expect;
// global.localStorage = new Storage();

// let database: Database;

// describe.only('Create Database Collection', () => {
//     before(() => {
//         database = new Database('Sample');
//     });

//     afterEach(() => {
//         database.empty();
//     });

//     after(() => {
//         database.drop();
//     });

//     it('should be able to create a new Database Collection', () => {        
//         const collection = database.createCollection<Sample>('Sample');
//         console.log(collection.documents);
        
//         // expect(collection).to.deep.include({ name: 'Sample', list: [] })
//     });
// });