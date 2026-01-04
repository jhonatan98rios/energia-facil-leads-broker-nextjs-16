import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI não definida");
}

let client: MongoClient;
let db: Db;

export async function getMongoDb(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();

  db = client.db(); // usa o db padrão da URI
  return db;
}
