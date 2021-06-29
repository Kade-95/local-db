import { LoneDB } from "./lone.db";

const lone = new LoneDB<{ name: string }>('Sample');
console.log(lone);
