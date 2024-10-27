import { Permission } from 'node-appwrite'

import { db, insightCollection } from "../name"
import { databases } from "./config"


export default async function createInsightCollection(){
    await databases.createCollection(db, insightCollection, insightCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("insight collection is created");
    
}