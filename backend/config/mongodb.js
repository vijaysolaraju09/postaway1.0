import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

export const connectToMongoDB = () => {
  const url = process.env.MONGO_URI;
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      db = client.db(process.env.DB_NAME);
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
  if (!db) {
    throw new Error(
      "MongoDB client is not initialized. Call connectToMongoDB first."
    );
  }
  return db;
};
