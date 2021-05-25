import { LoneDocument } from "./models/query.model";
export declare class LoneDB<T> {
    name: string;
    private get rawValue();
    get value(): LoneDocument<T>[];
    private setValue;
    private getValue;
    constructor(name: string);
    find(doc?: Partial<LoneDocument<T>>): LoneDocument<T>[];
    findOne(doc?: Partial<LoneDocument<T>>): LoneDocument<T> | undefined;
    insert(docs: T[]): LoneDocument<T>[];
    insertOne(doc: T): LoneDocument<T>;
    update(param: Partial<LoneDocument<T>>, doc: Partial<T>[]): {
        ok: boolean;
        n: number;
    };
    updateOne(param: Partial<LoneDocument<T>>, doc: Partial<T>): {
        ok: boolean;
        n: number;
    };
    delete(param: Partial<LoneDocument<T>>): {
        ok: boolean;
        n: number;
    };
    deleteOne(param: Partial<LoneDocument<T>>): {
        ok: boolean;
        n: number;
    };
    drop(): void;
}
