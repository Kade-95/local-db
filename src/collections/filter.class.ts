import { IDocument } from "../documents/document.interface";
import { IFilter } from "../models/filter.interface";
import { IQueryOption } from "../models/query-option.interface";
import { IQuery } from "../models/query.interface";

export class Filter<T> {
    filterActions: {[P in keyof IFilter<T>]?: (query: IQuery<T>, document: IDocument<T>) => boolean } = {
        '@and': this.andFilter,
        '@not': this.notFilter,
        '@like': this.likeFilter,
        '@in': this.inFilter,
        '@has': this.hasFilter,
        '@or': this.orFilter
    };
        
    private getFilter(data: IQuery<T>) {
        const { query, filter } = Object.keys(data).reduce((acc: any, red) => {
            if (red.startsWith('@')) {
                acc.filter = { ...acc.filter, [red]: (data as any)[red] }
            }
            else {
                acc.query = { ...acc.query, [red]: (data as any)[red] }
            }

            return acc;
        }, { query: {}, filter: {} });

        return { query, filter };
    }

    protected andFilter (query: IQuery<T>, document: IDocument<T>) {        
        let flag = false;        
        for (let attribute in query) {                                     
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = (query as any)[attribute];
                const value = (document as any)[attribute];
                flag = value === check;             
                if (!flag) {
                    break;
                }                 
            }
        }
        return flag;
    }

    protected orFilter (query: IQuery<T>, document: IDocument<T>) {
        let flag = false;                
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = (query as any)[attribute];
                const value = (document as any)[attribute];
                flag = (value === check) || flag;       
            }
        }
        
        return flag;
    }

    protected notFilter (query: IQuery<T>, document: IDocument<T>) {
        let flag = false;        
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = (query as any)[attribute];
                const value = (document as any)[attribute];
                flag = value !== check;   
                if (!flag) {
                    break;
                }         
            }
        }
        
        return flag;
    }

    protected likeFilter (query: {[P in keyof T]?: string }, document: IDocument<T>) {
        let flag = false;        
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = String((query as any)[attribute]);
                const value = String((document as any)[attribute]);
                flag = value.includes(check);  
                if (!flag) {
                    break;
                }          
            }
        }
        
        return flag;
    }

    protected inFilter (query: {[P in keyof T]?: [string] }, document: IDocument<T>) {        
        let flag = false;        
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = (query as any)[attribute] as Array<any>;
                const value = (document as any)[attribute] as any; 
                flag = check.includes(value);  
                if (!flag) {
                    break;
                } 
            }
        }
        
        return flag;
    }

    protected hasFilter (query: {[P in keyof T]?: string }, document: IDocument<T>) {        
        let flag = false;        
        for (let attribute in query) {                         
            if (Object.prototype.hasOwnProperty.call(document, attribute)) {
                const check = (query as any)[attribute] as any;
                const value = (document as any)[attribute] as Array<any>;
                if (typeof check === 'object') {
                    const found = this.query(value, check);  
                    flag = !!found.length;                                      
                }              
                else {
                    flag = value.includes(check);  
                }
                
                if (!flag) {
                    break;
                }  
            }
        }
        
        return flag;
    }

    protected query(documents: IDocument<T>[], data: IQuery<T> = {}) {        
        const { query, filter } = this.getFilter(data);                        
        return documents.filter(doc => {                            
            let flag: boolean = !!Object.values(query).length
                ? this.andFilter(query, doc)
                : true;

            if (filter) {                
                const filterFlag = Object.keys(filter).reduce((acc: boolean, red: string) => {
                    const filterQuery = (filter as any)[red];    
                    const boundFilterAction = (this.filterActions as any)[red].bind(this);                
                    const filterFlag = boundFilterAction(filterQuery, doc);                    
                    return acc && filterFlag;
                }, true);
                flag = flag && filterFlag;
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