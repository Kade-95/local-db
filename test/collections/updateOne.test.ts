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

describe('Update documents in a Collection', () => {

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

    it('should update item that matches the query', () => {
        const updated = collection.updateOne({ title: data.title }, { title: 'Renamed' });
        expect(updated).to.deep.include({ title: 'Renamed' });
    });

    it('should not fail if a unique item already exists data', () => {
        collection.insertOne({ title: data.title + 'dommy', amount: data.amount + 1 });

        expect(() => { collection.update({ title: data.title + 'dommy' }, { amount: data.amount }) })
            .throw(unique.amount);
    });
});
