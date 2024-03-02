import { CodeStorage } from "./../../src/storage/code-storage.class";
import * as chai from "chai";
import { Database } from "../../src";
import { Sample } from "../../src/models/sample.interface";

const expect = chai.expect;
global.localStorage = new CodeStorage();

let database: Database;

describe('findAll Database Collections', () => {
    before(() => {
        database = new Database('Sample');
        database.createCollection<Sample>('Sample');
        database.createCollection<Sample>('Nope');
    });

    afterEach(() => {
        database.empty();
    });

    after(() => {
        database.drop();
    });

    it(`should find all database collections`, () => {
        const collections = database.findAllCollections();
        expect(collections[0]).to.deep.include({ name: 'Sample', documents: [] });
        expect(collections.length).equals(2);
    });
});