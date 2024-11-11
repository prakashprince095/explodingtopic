import { Permission, Role } from 'node-appwrite';
import { db, insightCollection } from '../name';
import { databases } from './config';


async function createInsightCollection() {
  await databases.createCollection(db, insightCollection, insightCollection, [
    Permission.read(Role.any()),            
    Permission.read(Role.users()),          
    Permission.create(Role.users()),        
    Permission.update(Role.users()),        
    Permission.delete(Role.users()),        
  ]);
  console.log("Insight collection created");

  await databases.createStringAttribute(db, insightCollection, 'title', 256, true);
  await databases.createStringAttribute(db, insightCollection, 'volume', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'totalFunding', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'latestRound', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'employees', 64, false);
  await databases.createStringAttribute(db, insightCollection, 'categories', 256, false, undefined, true);  
  await databases.createStringAttribute(db, insightCollection, 'location', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'growth', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'description', 512, false);
  await databases.createBooleanAttribute(db, insightCollection, 'isFavorite', false);


  await databases.createStringAttribute(db, insightCollection, 'name', 256, true);
  await databases.createStringAttribute(db, insightCollection, 'salesVolume', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'totalRevenue', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'latestVersion', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'stock', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'categories', 256, false, undefined, true);
  await databases.createStringAttribute(db, insightCollection, 'productLocation', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'productGrowth', 128, false);
  await databases.createStringAttribute(db, insightCollection, 'productDescription', 512, false);
  await databases.createBooleanAttribute(db, insightCollection, 'isFavoriteProduct', false);

  // Track user-specific number of startups and products saved
  await databases.createIntegerAttribute(db, insightCollection, 'trendingStartupsCount', false);
  await databases.createIntegerAttribute(db, insightCollection, 'productDiscoveriesCount', false);
}

export default createInsightCollection;