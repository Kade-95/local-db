import { CodeStorage } from "./../../src/storage/code-storage.class";
import * as chai from "chai";
import { Database } from "../../src";
import { Sample } from "../../src/models/sample.interface";

const expect = chai.expect;
global.localStorage = new CodeStorage();

let database: Database;

describe('find Database Collection', () => {
    before(() => {
        database = new Database('Sample');
        database.createCollection<Sample>('Sample');
    });

    afterEach(() => {
        database.empty();
    });

    after(() => {
        database.drop();
    });

    it(`should find the collection with name`, () => {
        const collection = database.removeCollection('Sample');        
        expect(collection).to.deep.include({ name: 'Sample' });
    });

    it(`should fail when database collection doesn't exist`, () => {
        const collection = database.removeCollection('Nope');        
        expect(collection).equals(undefined);
    });
});