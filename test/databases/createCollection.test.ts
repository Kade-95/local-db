import { CodeStorage } from "./../../src/storage/code-storage.class";
import * as chai from "chai";
import { Database } from "../../src";
import { Sample } from "../../src/models/sample.interface";

const expect = chai.expect;
global.localStorage = new CodeStorage();

let database: Database;

describe('Create Database Collection', () => {
    before(() => {
        database = new Database('Sample');
    });

    afterEach(() => {
        database.empty();
    });

    after(() => {
        database.drop();
    });

    it('should be able to create a new Database Collection', () => {        
        const collection = database.createCollection<Sample>('Sample');        
        expect(collection).to.deep.include({ name: 'Sample', documents: [] });
        expect(database.collections.length).equal(1);
    });
});