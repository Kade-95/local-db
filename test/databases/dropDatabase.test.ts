import { Storage } from "./../../src/storage/storage.class";
import * as chai from "chai";
import { Database } from "../../src";
import { Sample } from "../../src/models/sample.interface";

const expect = chai.expect;
global.localStorage = new Storage();

let database: Database;

describe('drop Database', () => {
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
        database.drop();        
        expect(database.collections).equals(null);
    });
});