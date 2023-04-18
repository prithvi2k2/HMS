import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;

// check the MongoDB URI
if (!MONGO_URI) {
    throw new Error('Define the MONGO_URI environmental variable');
}

// check the MongoDB DB
if (!MONGO_DB) {
    throw new Error('Define the MONGO_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to DB
    let client = new MongoClient(MONGO_URI, opts);
    // let client = new MongoClient(MONGO_URI);
    await client.connect();
    let db = client.db(MONGO_DB);


    // Create/Init Indexes
    db.collection("hospitals").createIndex(
        { mail: "text" },
        { unique: true })


    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}