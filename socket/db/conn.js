const { MongoClient } = require("mongodb");

const uri = 'mongodb://mongodb:27017';
const dbName = 'scalar-chat';

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
