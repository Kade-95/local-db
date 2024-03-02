import * as chai from "chai";
import { Engine } from "../../src/engine/engine.class";
import { EngineTypes } from "../../src/models/engine.types";

const expect = chai.expect;
let engine: Engine;
let data: Array<any>;

describe('To Entity', () => {
    beforeEach(() => {
        engine = new Engine(EngineTypes.CODESTORAGE);
    });

    afterEach(() => {
        engine.storage.clear();
    });

    it('should get single data entity', () => {
        data = [{ name: 'A' }, { name: 'B'}];
        const entity = engine.toEntity(data, 'name');
        expect(entity).to.deep.equal({ A: { name: 'A'}, B: { name: 'B' }});
    });

    it('should get multi data entity', () => {
        data = [{ name: 'A', age: 2 }, { name: 'B', age: 1 }];
        const entity = engine.toEntity(data, 'name');
        expect(entity).to.deep.equal({ A: { name: 'A', age: 2 }, B: { name: 'B', age: 1  }});
    });
});