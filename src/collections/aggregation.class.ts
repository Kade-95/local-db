import { IDocument } from "../documents/document.interface";
import { IAggragtion } from "../models/aggregation.interface";
import { IQueryOption } from "../models/query-option.interface";
import { IQuery } from "../models/query.interface";

export class Aggregation<T> {
    constructor () {

    }

    protected filter (query: IQuery<T>, document: IDocument<T>) {
        let flag = true;
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = (query as any)[attribute];
                const value = (document as any)[attribute];
                flag = value === check;              
            }
        }
        
        return flag;
    }

    protected aggregate(document: IDocument<T>, aggregation: IAggragtion<T>) {
        let flag = true;
        if (aggregation.not) {
            flag = flag && this.notFilter(aggregation.not, document);
        }

        if (aggregation.like) {
            flag = flag && this.like(aggregation.like, document);
        }

        return flag;
    }

    protected notFilter (query: IQuery<T>, document: IDocument<T>) {
        let flag = true;        
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = (query as any)[attribute];
                const value = (document as any)[attribute];
                flag = value !== check;              
            }
        }
        
        return flag;
    }

    protected like (query: {[P in keyof T]?: string }, document: IDocument<T>) {
        let flag = true;
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = String((query as any)[attribute]);
                const value = String((document as any)[attribute]);
                flag = value.includes(check);            
            }
        }
        
        return flag;
    }

    protected query(documents: IDocument<T>[], query: IQuery<T> = {}, aggregation?: IAggragtion<T>) {
        return documents.filter(doc => {                            
            let flag: boolean = this.filter(query, doc);            
            if (aggregation) {
                flag = flag && this.aggregate(doc, aggregation);
            }
            return flag;
        })
    }

    protected paginate(list: IDocument<T>[], options: IQueryOption = { sort: { createdAt: 'desc' } }) {
        let sorted = list;
        const { sort, limit = 0, skip = 0 } = options;
        const skipStart = limit ? skip * limit : skip;
        const skipStop = limit ? skipStart + limit : list.length;        
        
        for (const key in sort) {
            if (Object.prototype.hasOwnProperty.call(sort, key)) {
                const flag = sort[key] === 'desc' ? -1 : 1;
                sorted = list.sort((a: any, b: any) => {
                    return a[key] > b[key]
                        ? flag
                        : a[key] < b[key]
                            ? -flag
                            : 0
                            });
            }
        }
        
        const result = sorted.slice(skipStart, skipStop);
        return result;
    }
}