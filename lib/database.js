import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI; //connection uri
const MONGO_DB = process.env.MONGO_DB; //database name

// check if MongoDB URI is defined in env
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set as environment variable');
}

// check if Mongo DB is defined in env
if (!MONGO_DB) {
    throw new Error('MONGO_DB is not set as environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check cache for active instances
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