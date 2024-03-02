export type Sort = { [name: string]:  'asc' | 'desc' };;

export interface IQueryOption {
    limit?: number;
    skip?: number;
    sort?: Sort
}