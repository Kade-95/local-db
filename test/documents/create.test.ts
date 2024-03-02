import { CodeStorage } from "./../../src/storage/code-storage.class";
import * as chai from "chai";
import { Sample } from "../../src/models/sample.interface";
import { Document } from "../../src/documents/document.class";

const expect = chai.expect;
global.localStorage = new CodeStorage();

const data: Sample = { title: 'Sample', amount: 5 };

describe('create a Document', () => {

    it(`should have an _id`, () => {
        const document = new Document<Sample>(data);
        expect(document.value).to.deep.include(data);
        expect(document.value).haveOwnProperty('_id');
    });

    it(`should have createdAt and updatedAt`, () => {
        const document = new Document<Sample>(data, { timestamp: true });
        expect(document.value).haveOwnProperty('createdAt');
        expect(document.value).haveOwnProperty('updatedAt');
    });
});