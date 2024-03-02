import { Collection } from "./../../src/collections/collection.class";
import { CodeStorage } from "./../../src/storage/code-storage.class";
import { Sample } from "./../../src/models/sample.interface";
import * as chai from "chai";
import { DocumentKeys } from "../../src/documents/document.keys";


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

describe('Insert one document into Collection', () => {
    
    before(() => {
        collection = new Collection<Sample>('Sample', { timestamp: false, unique, required });
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it('should insert a document', () => {
        const clone = Object.assign({}, data);
        const doc = collection.insertOne(clone);
        expect(doc).to.deep.include({ title: data.title, amount: data.amount })
    });

    it('should not fail if a required item is not provided', () => {
        expect(() => { collection.insertOne({} as any) })
            .throw(required.title);
    });

    it('should not fail if a unique item already exists', () => {
        const clone = Object.assign({}, data);
        collection.insertOne(clone);
        expect(() => { collection.insertOne(clone) })
            .throw(unique.amount);
    });
});
