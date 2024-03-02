import * as chai from "chai";
import { Engine } from "../../src/engine/engine.class";
import { EngineTypes } from "../../src/models/engine.types";
import { Database } from "../../src";

const expect = chai.expect;
let engine: Engine;
let data: Array<any>;

describe('Database', () => {
    beforeEach(() => {
        engine = new Engine(EngineTypes.CODESTORAGE);
    });

    afterEach(() => {
        engine.storage.clear();
    });

    it('should create a database', () => {
        engine.saveDatabase('sample');
        data = engine.findDatabase('sample');
        expect(data).to.deep.equal([]);
    });

    it('should update a database', () => {
        const database = new Database('sample');
        database.createCollection('a-collection');
        engine.saveDatabase('sample', database.collections);
        data = engine.findDatabase('sample');
        expect(data.length).to.equal(1);
    });

    it('should remove a database', () => {
        const database = new Database('sample');
        database.createCollection('a-collection');
        engine.saveDatabase('sample', database.collections);
        engine.removeDatabase('sample');
        data = engine.findDatabase('sample');
        expect(data).to.equal(null);
    });
});