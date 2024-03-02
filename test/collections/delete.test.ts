import { Collection } from "./../../src/collections/collection.class";
import { CodeStorage } from "./../../src/storage/code-storage.class";
import { Sample } from "./../../src/models/sample.interface";

import * as chai from "chai";
import { after } from "mocha";

const expect = chai.expect;
global.localStorage = new CodeStorage();

const data: Sample = {
    title: "New Item",
    amount: 50
}

let collection: Collection<Sample>;

describe('Remove documents in a Collection', () => {

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

    it('should remove all the items that matches the query', () => {
        const removed = collection.remove({ title: data.title });
        expect(removed.length).eq(2);
        expect(removed[0]).to.deep.include({ title: data.title });
    });

    it('should fail if no item matches the query', () => {
        const removed = collection.remove({ _id: 'hello' });
        expect(removed.length).eqls(0);
    });
});
