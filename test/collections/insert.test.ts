import { Collection } from "./../../src/collections/collection.class";
import { CodeStorage } from "./../../src/storage/code-storage.class";
import { Sample } from "./../../src/models/sample.interface";

import * as chai from "chai";
import { DocumentKeys } from "../../src/documents/document.keys";
import { after } from "mocha";

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

describe('Insert many into a Collection', () => {

    before(() => {
        collection = new Collection<Sample>('Sample', { timestamp: false, unique, required });
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it('should insert a list of documents', () => {
        const list = [Object.assign({}, data)];
        const docs = collection.insert(list);
        expect(docs[0]).to.deep.include({ title: data.title, amount: data.amount });
        expect(docs.length).equals(list.length);
    });

    it('should not fail if a required item is not provided in list of items', () => {
        expect(() => { collection.insert([{} as any]) })
            .throw(required.title);
    });

    it('should not fail if a unique item already exists in list of items', () => {
        const list = [Object.assign({}, data), Object.assign({}, data)];
        expect(() => { collection.insert(list) })
            .throw(unique.amount);
    });
});
