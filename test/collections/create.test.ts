import { Collection } from "./../../src/collections/collection.class";
import { CodeStorage } from "./../../src/storage/code-storage.class";

import * as chai from "chai";
import { Sample } from "../../src/models/sample.interface";

const expect = chai.expect;
global.localStorage = new CodeStorage();

let collection: Collection<Sample>;

describe('Create Collection', () => {
    before(() => {
        collection = new Collection<Sample>('Sample', { timestamp: false });
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it('should be able to create a new Collection', () => {
        expect(collection).to.deep.include({ name: 'Sample', documents: [] })
    });
});