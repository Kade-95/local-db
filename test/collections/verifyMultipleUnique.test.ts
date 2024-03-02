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

describe('verifyMultipleUnique in Collection', () => {

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

    it('should succeed if all unique attributes are not duplicated in any item in list', () => {
        const clone = Object.assign({}, { ...data, amount: data.amount + 1 });
        expect(() => { Collection.verifyMultipleUnique(collection, [clone]) }).not.throw(unique.amount)
    });

    it('should fail if any unique attribute is duplicated in any item in list', () => {
        const clone = Object.assign({}, data);
        expect(() => { Collection.verifyMultipleUnique(collection, [clone]) }).to.throw(unique.amount)
    });
});
