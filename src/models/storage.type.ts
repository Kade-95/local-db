export interface IStorage {
    length: number;
    setItem: (key: string, value: string) => void,
    getItem: (key: string) => any,
    clear: () => void,
    removeItem: (key: string) => void,
    key: (index: number) => string | null,
}