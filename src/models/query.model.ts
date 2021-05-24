export interface Base {
    _id?: string;
}

export type LoneDocument<T> = {
    [P in keyof (T & Base)]: (T & Base)[P]
}