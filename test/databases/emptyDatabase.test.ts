import { CodeStorage } from "./../../src/storage/code-storage.class";
import * as chai from "chai";
import { Database } from "../../src";
import { Sample } from "../../src/models/sample.interface";

const expect = chai.expect;
global.localStorage = new CodeStorage();

let database: Database;

describe('empty Database', () => {
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
        database.empty();
        expect(database.collections.length).equals(0);
    });
});