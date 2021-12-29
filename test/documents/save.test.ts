import { Storage } from "./../../src/storage/storage.class";
import * as chai from "chai";
import { Sample } from "../../src/models/sample.interface";
import { Document } from "../../src/documents/document.class";
import { Collection } from "../../src";

const expect = chai.expect;
global.localStorage = new Storage();

const data: Sample = { title: 'Sample', amount: 5 };
let collection: Collection<Sample>;

describe('save a Document', () => {

    beforeEach(() => {
        collection = new Collection<Sample>('Sample');
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it(`should have an _id`, () => {
        const document = new Document<Sample>(data, { collection });
        document.value.title = "Renamed";
        document.save();

        expect(document.value).to.deep.include({ title: 'Renamed' });
    });

    it(`should have createdAt and updatedAt`, () => {
        const document = new Document<Sample>(data);
        document.value.title = "Renamed";

        expect(() => { document.save() }).throw('Document does not have a collection');
    });
});