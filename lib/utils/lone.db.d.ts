import { Document } from "../models/query.model";
export declare class LoneDB<T> {
    name: string;
    private get rawValue();
    get value(): Document<T>[];
    private setValue;
    private getValue;
    constructor(name: string);
    find(query?: Partial<Document<T>>): Document<T>[];
    findOne(query?: Partial<Document<T>>): Document<T> | undefined;
    insert(docs: T[]): Document<T>[];
    insertOne(doc: T): Document<T>;
    update(query: Partial<Document<T>>, doc: Partial<T>): {
        ok: boolean;
        n: number;
    };
    updateOne(query: Partial<Document<T>>, doc: Partial<T>): {
        ok: boolean;
        n: number;
    };
    delete(query: Partial<Document<T>>): {
        ok: boolean;
        n: number;
    };
    deleteOne(query: Partial<Document<T>>): {
        ok: boolean;
        n: number;
    };
    drop(): void;
}
