import { Collection } from "./../../src/collections/collection.class";
import { Storage } from "./../../src/storage/storage.class";
import { Sample } from "./../../src/models/sample.interface";
import * as chai from "chai";
import { DocumentKeys } from "../../src/documents/document.keys";


const expect = chai.expect;
global.localStorage = new Storage();

const data: Sample = {
    title: "New Item",
    amount: 50
}

const required: DocumentKeys<Sample> = {
    title: 'Please provide title'
};

const unique: DocumentKeys<Sample> = {
    amount: 'Duplicate amount found'
};

let collection: Collection<Sample>;

describe('verifyRequired in Collection', () => {

    before(() => {
        collection = new Collection<Sample>('Sample', { timestamp: false, unique, required });
    });

    beforeEach(() => {
        collection.insertOne(data);
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it('should succeed if all required attributes are provided', () => {
        const clone = Object.assign({}, { ...data, amount: data.amount + 1 });
        expect(() => { Collection.verifyRequired(collection, clone) }).not.throw(required.title)
    });

    it('should fail if any required attributes is not provided', () => {
        const clone = Object.assign({}, { ...data, amount: data.amount + 1, title: undefined });
        expect(() => { Collection.verifyRequired(collection, clone) }).to.throw(required.title)
    });
});
