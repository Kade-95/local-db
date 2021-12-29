import { Storage } from "./../../src/storage/storage.class";
import * as chai from "chai";
import { Database } from "../../src";

const expect = chai.expect;
global.localStorage = new Storage();

let database: Database;

describe('Create Database', () => {
    before(() => {
        database = new Database('Sample');
    });

    afterEach(() => {
        database.empty();
    });

    after(() => {
        database.drop();
    });

    it('should be able to create a new Database', () => {
        expect(database).to.deep.include({ name: 'Sample', collections: [] })
    });
});