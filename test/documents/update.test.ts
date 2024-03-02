import { CodeStorage } from "./../../src/storage/code-storage.class";
import * as chai from "chai";
import { Sample } from "../../src/models/sample.interface";
import { Document } from "../../src/documents/document.class";
import { Collection } from "../../src";

const expect = chai.expect;
global.localStorage = new CodeStorage();

const data: Sample = { title: 'Sample', amount: 5 };
let collection: Collection<Sample>;

describe('update a Document', () => {

    beforeEach(() => {
        collection = new Collection<Sample>('Sample');
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it(`should update the document`, () => {
        const document = new Document<Sample>(data, { collection }).save();
        document.update({ title: 'Renamed' });
        expect(document.value).to.deep.include({ title: 'Renamed' });
    });

    it(`should fail if document does not belong to a collection`, () => {
        const document = new Document<Sample>(data);
        expect(() => { document.update({ title: 'Renamed' }) }).throw('Document does not have a collection');
    });
});