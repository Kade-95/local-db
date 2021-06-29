export interface Base {
    _id?: string;
}

export type Document<T> = {
    [P in keyof (T & Base)]: (T & Base)[P]
}