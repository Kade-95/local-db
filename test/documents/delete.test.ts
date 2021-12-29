import { Storage } from "./../../src/storage/storage.class";
import * as chai from "chai";
import { Sample } from "../../src/models/sample.interface";
import { Document } from "../../src/documents/document.class";
import { Collection } from "../../src";

const expect = chai.expect;
global.localStorage = new Storage();

const data: Sample = { title: 'Sample', amount: 5 };
let collection: Collection<Sample>;

describe('delete a Document', () => {
    beforeEach(() => {
        collection = new Collection<Sample>('Sample');
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it(`should delete a document`, () => {
        const document = new Document<Sample>(data, { collection }).save();
        document.remove();

        expect(document.value).equals(undefined);
    });

    it(`should have createdAt and updatedAt`, () => {
        const document = new Document<Sample>(data);
        expect(() => { document.remove() }).throw('Document does not have a collection');
    });
});