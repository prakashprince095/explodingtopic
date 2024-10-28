import { db } from "../name";
import createInsightCollection from "./insight.collection";
import createProfileCollection from "./profile.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get(db)
        console.log("Database Connection");
        
    } catch (error) {
        try {
            await databases.create(db, db)
            console.log("database created")
            await Promise.all([
                createInsightCollection(),
                createProfileCollection(),
            ])
            console.log("collection created");
            console.log("Database connected");
        } catch (error) {
            console.log("Error creating databases or collection", error);
            
        }
    }

    return databases
}