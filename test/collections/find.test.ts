import { Collection } from "./../../src/collections/collection.class";
import { CodeStorage } from "./../../src/storage/code-storage.class";
import { Sample } from "./../../src/models/sample.interface";

import * as chai from "chai";
import { after } from "mocha";

const expect = chai.expect;
global.localStorage = new CodeStorage();

const data: Sample = {
    title: "New Item",
    amount: 50,
    list: [1, 2, 3]
}

let collection: Collection<Sample>;

describe('Find documents in a Collection', () => {

    before(() => {
        collection = new Collection<Sample>('Sample', { timestamp: false });
    });

    beforeEach(() => {
        const list = [
            Object.assign({}, data), 
            Object.assign({}, { ...data, amount: data.amount + 1 })
        ];
        collection.insert(list);
    });

    afterEach(() => {
        collection.empty();
    });

    after(() => {
        collection.drop();
    });

    it('should find all the items that matches the query', () => {
        collection.insertOne(Object.assign({}, { ...data, title: 'Another Item', amount: 45 }));
        const found = collection.find({ title: data.title });
        
        expect(found.length).eq(2);        
        expect(found[0]).to.deep.include({ title: data.title });
    });

    it('should find all the items that matches the multiple query', () => {
        collection.insertOne(Object.assign({}, { ...data, title: 'Another Item', amount: 45 }));
        const found = collection.find({ title: data.title, amount: 50 });
        
        expect(found.length).eq(1);        
        expect(found[0]).to.deep.include({ title: data.title });
    });

    it('should get 0 when no item matches the query', () => {
        const removed = collection.find({ _id: 'hello' });
        expect(removed.length).eqls(0);
    });

    it('should sort items based on attribute', () => {
        const found = collection.find({ title: data.title }, { sort: { amount: 'desc' }});        
        expect(found[0]).to.deep.include({ amount: data.amount + 1 });
    });

    it('should limit items to only 1', () => {
        const found = collection.find({ title: data.title }, { limit: 1 });        
        expect(found.length).eqls(1);
    });

    it('should skip the first item', () => {
        const found = collection.find({ title: data.title }, { skip: 1 });        
        expect(found.length).eqls(1);
        expect(found[0]).to.deep.include({ amount: data.amount + 1 });
    });

    it('should sort, skip and limit items based on attribute', () => {
        collection.insertOne({ ...data, amount: 90 });
        const found = collection.find({ title: data.title }, { sort: { amount: 'desc' }, skip: 1, limit: 1});  
        expect(found.length).eqls(1);      
        expect(found[0]).to.deep.include({ amount: data.amount + 1 });
    });

    it('should find all the items that does not match the query', () => {
        collection.insertOne(Object.assign({}, { ...data, title: 'Another Item' }));
        const found = collection.find({ '@not': { title: data.title }});
        
        expect(found.length).eq(1);
        expect(found[0]).to.deep.include({ title: 'Another Item' });
    });

    it('should find all the items that are like the query', () => {
        collection.insertOne(Object.assign({}, { ...data, title: 'Another Item' }));
        const found = collection.find({ '@like': { title: 'Ano' }});
        
        expect(found.length).eq(1);
        expect(found[0]).to.deep.include({ title: 'Another Item' });
    });

    it('should find all the items that are within the specified array', () => {
        collection.insertOne(Object.assign({}, { ...data, title: 'Another Item' }));
        const found = collection.find({ '@includes': { title: ['Another Item'] }});
        
        expect(found.length).eq(1);
        expect(found[0]).to.deep.include({ title: 'Another Item' });
    });

    it('should find all the items that are within the specified array', () => {
        collection.insertOne(Object.assign({}, { ...data, list: [0, 2, 4, 6] }));
        const found = collection.find({ '@has': { list: 4 }});
        
        expect(found.length).eq(1);
        expect(found[0].list).to.deep.members([0, 2, 4, 6]);
    });

    it('should find all the items that match any of the specified or-filter', () => {
        collection.insertOne(Object.assign({}, { ...data, title: 'Another item', amount: 45 }));        
        const found = collection.find({ '@or': { title: data.title, amount: 45 }});
        
        expect(found.length).eq(3);
    });

    it('should find all the items that match all the specified filters', () => {
        collection.insertOne(Object.assign({}, { ...data, title: 'Another item', amount: 45, list: [0, 2, 4, 6] }));        
        const found = collection.find({ '@or': { title: data.title, amount: 45 }, '@has': { list: 4 }});
        
        expect(found.length).eq(1);
        expect(found[0].list).to.deep.members([0, 2, 4, 6]);
    });
});
