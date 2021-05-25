export interface Base {
    _id?: string;
}
export declare type LoneDocument<T> = {
    [P in keyof (T & Base)]: (T & Base)[P];
};
