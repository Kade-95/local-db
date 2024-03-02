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

describe('Clone a Collection', () => {
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

    it('should clone a collection', () => {
        const clone = Collection.clone(collection, 'clone');
        expect(clone).to.deep.include({ name: 'clone' });
        expect(clone.length).equals(collection.length);
        expect(clone.documents[0]).to.deep.include({ _id: collection.documents[0]._id });
    });
});
