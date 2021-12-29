import { Storage } from "./../../src/storage/storage.class";
import * as chai from "chai";
import { Database } from "../../src";
import { Sample } from "../../src/models/sample.interface";

const expect = chai.expect;
global.localStorage = new Storage();

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
        const collection = database.findCollection('Sample');
        expect(collection).to.deep.include({ name: 'Sample', documents: [] });
    });

    it(`should fail if database collection doesn't exist`, () => {
        const collection = database.findCollection('Nope');
        expect(collection).equals(undefined);
    });
});