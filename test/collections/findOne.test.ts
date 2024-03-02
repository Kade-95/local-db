import { Collection } from "./../../src/collections/collection.class";
import { Storage } from "./../../src/storage/storage.class";
import { Sample } from "./../../src/models/sample.interface";

import * as chai from "chai";
import { after } from "mocha";

const expect = chai.expect;
global.localStorage = new Storage();

const data: Sample = {
    title: "New Item",
    amount: 50
}

let collection: Collection<Sample>;

describe('Remove document in a Collection', () => {

    before(() => {
        collection = new Collection<Sample>('Sample', { timestamp: false });
    });

    beforeEach(() => {
        const list = [Object.assign({}, data), Object.assign({}, { ...data, amount: data.amount + 1 })];
        collection.insert(list);
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it('should remove the that matches the query', () => {
        const removed = collection.removeOne({ title: data.title });
        expect(removed).to.deep.include({ title: data.title });
    });

    it('should fail if no item matches the query', () => {
        const removed = collection.removeOne({ _id: 'hello' });
        expect(removed).eqls(undefined);
    });
});
