import { Collection } from "./../../src/collections/collection.class";
import { Storage } from "./../../src/storage/storage.class";
import { Sample } from "./../../src/models/sample.interface";

import * as chai from "chai";
import { DocumentKeys } from "../../src/documents/document.keys";
import { after } from "mocha";

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

describe('Update documents in a Collection', () => {

    before(() => {
        collection = new Collection<Sample>('Sample', { timestamp: false, unique, required });
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it('should update all the items that matches the query', () => {
        const list = [Object.assign({}, data), Object.assign({}, { ...data, amount: data.amount + 1 })];
        collection.insert(list);

        const updated = collection.update({ title: data.title }, { title: 'Renamed' });
        expect(updated[0]).to.deep.include({ title: 'Renamed' });
        expect(updated.length).greaterThanOrEqual(list.length);
    });

    it('should not fail if a unique item already exists in list of items', () => {
        const list = [Object.assign({}, data), Object.assign({}, { ...data, amount: data.amount + 1 })];
        collection.insert(list);
        expect(() => { collection.update({ title: data.title }, { amount: data.amount }) })
            .throw(unique.amount);
    });
});
