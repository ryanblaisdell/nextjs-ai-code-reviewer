import "server-only";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MongoDB connection URI is not defined or could not be found.");
}

const mongodb_uri = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(mongodb_uri, options);
const clientPromise = client.connect();

export default clientPromise;
