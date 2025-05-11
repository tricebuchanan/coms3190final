const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";

const client = new MongoClient(url);
let db = null;

async function getDb() {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
    }
    return db;
}

module.exports = getDb;
