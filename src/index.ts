import { Collection } from "./collections/collection.class";
import { Database } from "./databases/database.class";
import { Document } from "./documents/document.class";
import { IDocument } from "./documents/document.interface";
import { Sample } from "./models/sample.interface";

export { Database, Collection, Document, IDocument };
const a = new Collection<Sample>('S');
const b = a.insertOne({ title: '33', amount: 5 });
a.updateOne({ _id: b._id }, { title: '334' })