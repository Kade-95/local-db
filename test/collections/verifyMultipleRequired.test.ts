import { Collection } from "./../../src/collections/collection.class";
import { CodeStorage } from "./../../src/storage/code-storage.class";
import { Sample } from "./../../src/models/sample.interface";
import * as chai from "chai";
import { DocumentKeys } from "../../src/documents/document.keys";


const expect = chai.expect;
global.localStorage = new CodeStorage();

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

describe('verifyMultipleRequired in Collection', () => {

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

    it('should succeed if all required attributes are provided in all items list', () => {
        const clone = Object.assign({}, { ...data, amount: data.amount + 1 });
        expect(() => { Collection.verifyMultipleRequired(collection, [clone]) }).not.throw(required.title)
    });

    it('should fail if any required attributes is not provided in any item in list', () => {
        const clone = Object.assign({}, { ...data, amount: data.amount + 1, title: undefined });
        expect(() => { Collection.verifyMultipleRequired(collection, [clone]) }).to.throw(required.title)
    });
});
