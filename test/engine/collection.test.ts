import * as chai from "chai";
import { Engine } from "../../src/engine/engine.class";
import { EngineTypes } from "../../src/models/engine.types";
import { ICollection } from "../../src/collections/collection.interface";

const expect = chai.expect;
let engine: Engine;
let data: ICollection<any> | undefined;

describe('Database', () => {
    beforeEach(() => {
        engine = new Engine(EngineTypes.CODESTORAGE);
        engine.saveCollection({ _id: 's', name: 'sample', documents: [] });
    });

    afterEach(() => {
        engine.storage.clear();
    });

    it('should create a collection', () => {
        data = engine.findCollection('sample');
        expect(data?.name).to.equal('sample');
    });

    it('should update a collection', () => {
        engine.saveCollection({ _id: 's', name: 'sample', documents: [{ _id: 'Sample' }] });
        data = engine.findCollection('sample');
        expect(data?.documents.length).to.equal(1)
    });

    it('should remove a collection', () => {
        engine.removeCollection('sample');
        data = engine.findCollection('sample');
        expect(data).to.equal(null);
    });
});