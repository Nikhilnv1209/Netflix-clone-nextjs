import { MongoClient, ConnectOptions } from "mongodb";

const { DATABASE_URL, MONGODB_DB } = process.env;

if (!DATABASE_URL) throw new Error("Please add your Mongo URI to .env.local");
if (!MONGODB_DB) throw new Error("Please add your Mongo DB to .env.local");

let cachedClient: MongoClient;

export default async function MongoDBconnect() {
  if (!cachedClient) {
    const client = new MongoClient(
      DATABASE_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    await client.connect();
    cachedClient = client;
  }

  return cachedClient;
}
