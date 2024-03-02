import * as chai from "chai";
import { Engine } from "../../src/engine/engine.class";
import { EngineTypes } from "../../src/models/engine.types";
import { CodeStorage } from "../../src";
import { LocalStorage } from "../../src/storage/local-storage.class copy";
import { FileStorage } from "../../src/storage/file-storage.class";

const expect = chai.expect;
let engine: Engine;

describe('Create Engine', () => {
    afterEach(() => {
        engine.storage.clear();
    });

    it('should be able to create a defualt Engine', () => {
        engine = new Engine(EngineTypes.CODESTORAGE);
        expect(engine).to.deep.include({ type: EngineTypes.CODESTORAGE });
        expect(engine.storage instanceof CodeStorage).eqls(true);
    });

    it('should be able to create local storage engine', () => {
        engine = new Engine(EngineTypes.LOCALSTORAGE);
        expect(engine).to.deep.include({ type: EngineTypes.LOCALSTORAGE });
        expect(engine.storage instanceof LocalStorage).eqls(true);
    });

    it('should be able to create file storage engine', () => {
        engine = new Engine(EngineTypes.FILESTORAGE);
        expect(engine).to.deep.include({ type: EngineTypes.FILESTORAGE });
        expect(engine.storage instanceof FileStorage).eqls(true);
    });
});