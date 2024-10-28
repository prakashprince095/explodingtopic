import { Permission, Role } from 'node-appwrite';
import { databases } from './config';
import { db, profileCollection } from '../name';

export default async function createProfileCollection() {
  try {
    await databases.createCollection(db, profileCollection, profileCollection, [
      Permission.read(Role.any()), // Allows anyone to read profiles
      Permission.read(Role.users()), // Allows authenticated users to read profiles
      Permission.create(Role.users()), // Allows authenticated users to create their profiles
      Permission.update(Role.users()), // Allows users to update their own profile
      Permission.delete(Role.users()), // Allows users to delete their profile
    ]);

    console.log("Profile collection is created");

    // Create attributes for the Profile collection
    await databases.createStringAttribute(db, profileCollection, 'username', 255, true);
    await databases.createStringAttribute(db, profileCollection, 'email', 255, true);
    await databases.createStringAttribute(db, profileCollection, 'teamMemberName', 255, false);
    await databases.createStringAttribute(db, profileCollection, 'teamMemberEmail', 255, false);
    await databases.createIntegerAttribute(db, profileCollection, 'seatsFilled', false);
    await databases.createStringAttribute(db, profileCollection, 'currentPlan', 255, false);
    await databases.createStringAttribute(db, profileCollection, 'startDate', 50, false);
    await databases.createStringAttribute(db, profileCollection, 'supportEmail', 255, false);

    console.log("Attributes for the Profile collection are created");
  } catch (error) {
    console.error("Error creating profile collection or attributes:", error);
  }
}
