import { MongoClient } from "mongodb";

const mongdb_uri=process.env.MONGODB_URI
if(!mongdb_uri){
    throw new Error("Mongo uri is not defined");
}

const client = new MongoClient(mongdb_uri);

async function connectDB() {
    await client.connect();
    console.log("mongo connect sucessfully")

return client.db("Blog")
}

export async function getcollection(collectionName:string){
    const db = await connectDB();

    return db.collection(collectionName);
}