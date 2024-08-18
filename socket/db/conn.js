const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_CONNECTION_STRING;
const dbName = process.env.MONGO_DB_NAME;

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDB };
