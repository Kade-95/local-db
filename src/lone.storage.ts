import { v4 as uuidV4 } from "uuid";
import { LoneDocument } from "./models/query.model";

export class LoneDB<T>{
    private get rawValue() {
        return localStorage.getItem(this.name);
    }

    get value() {
        const value = this.getValue();
        return value;
    }

    private setValue(value = this.value) {
        localStorage.setItem(this.name, JSON.stringify(value));
    }

    private getValue() {
        let data = this.rawValue;
        let value: LoneDocument<T>[] = [];

        try {
            value = JSON.parse(data as string) as [];
        } catch (error) {
            value = [];
        }

        return value;
    }

    constructor(public name: string) {
        if (!this.value)
            this.setValue([]);
    }

    find(doc?: Partial<LoneDocument<T>>) {
        return doc
            ? this.value.filter(v => {
                let flag: boolean = false;

                for (let k in v) {
                    if ((doc as any)[k]) {
                        flag = (v as any)[k] === (doc as any)[k];

                        if (!flag) return;
                    }
                }
                return flag;
            })
            : this.value;
    }

    findOne(doc?: Partial<LoneDocument<T>>) {
        return doc
            ? this.value.find(v => {
                let flag: boolean = false;

                for (let k in v) {
                    if ((doc as any)[k]) {
                        flag = (v as any)[k] === (doc as any)[k];

                        if (!flag) return;
                    }
                }
                return flag;
            })
            : this.value[0];
    }

    insert(docs: T[]) {
        const data = this.value;
        for (let doc of docs)
            data.push({ ...doc, _id: uuidV4() });

        this.setValue(data);

        return docs as LoneDocument<T>[];
    }

    insertOne(doc: T) {
        const data = this.value;
        data.push({ _id: uuidV4(), ...doc });
        this.setValue(data);

        return doc as LoneDocument<T>;
    }

    update(param: Partial<LoneDocument<T>>, doc: Partial<T>[]) {
        const found = this.find(param) as LoneDocument<T>[];
        let detail = { ok: false, n: 0 };
        if (found) {
            for (let i = 0; i < found.length; i++) {
                for (let j in doc) {
                    (found[i] as any)[j] = (doc as any)[j];
                }
            }

            let value = this.value.map(v => {
                found.map(f => {
                    if (v._id == f._id) {
                        v = f;
                        detail = { ok: true, n: detail.n++ };
                    }
                    return v;
                });

                return v;
            });

            this.setValue(value);
            detail = { ok: true, n: 1 };
        }

        return detail;
    }

    updateOne(param: Partial<LoneDocument<T>>, doc: Partial<T>) {
        const found = this.findOne(param);
        let detail = { ok: false, n: 0 };

        if (found) {
            for (let i in doc) {
                (found as any)[i] = (doc as any)[i];
            }

            let value = this.value.map(v => {
                if (v._id == found._id) {
                    detail = { ok: true, n: detail.n++ };
                    v = found;
                }
                return v;
            });
            this.setValue(value);
        }

        return detail;
    }

    delete(param: Partial<LoneDocument<T>>) {
        const found = this.find(param) as LoneDocument<T>[];
        let detail = { ok: false, n: 0 };

        if (found) {
            let value = this.value.filter(v => {
                let flag: boolean = true;
                found.map(f => {
                    if (v._id == f._id) {
                        detail.n++;
                        flag = false;
                    }
                });

                return flag;
            });

            this.setValue(value);
            detail = { ok: true, n: 1 };
        }

        return detail;
    }

    deleteOne(param: Partial<LoneDocument<T>>) {
        const found = this.findOne(param);
        let detail = { ok: false, n: 0 };

        if (found) {
            detail.ok = true;

            let value = this.value.filter(v => {
                let flag: boolean = true;

                if (v._id == found._id) {
                    detail.n++;
                    flag = false;
                }
                return flag;
            });

            this.setValue(value);
        }

        return detail;
    }

    drop() {
        localStorage.setItem(this.name, 'null');
    }
}