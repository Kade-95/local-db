import * as chai from "chai";
import { Engine } from "../../src/engine/engine.class";
import { EngineTypes } from "../../src/models/engine.types";
import { Entity } from "../../src/models/entity.interface";

const expect = chai.expect;
let engine: Engine;
let entity: Entity<any>;

describe('From Entity', () => {
    beforeEach(() => {
        engine = new Engine(EngineTypes.CODESTORAGE);
    });

    afterEach(() => {
        engine.storage.clear();
    });

    it('should get a number list from object', () => {
        entity = { a: 1, b: 2 };
        const data = engine.fromEntity(entity); 
        expect(data).to.deep.equal([1, 2])
    });

    it('should get a object list from object', () => {
        entity = { a: { name: 'A' }, b: { name: 'B'} };
        const data = engine.fromEntity(entity);         
        expect(data).to.deep.equal([{ name: 'A'}, { name: 'B' }]);
    });
});