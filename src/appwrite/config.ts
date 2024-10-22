import env from '@/env';
import { Client, Account, ID, Databases } from 'appwrite';

// Define types for user account creation and login
interface CreateUserAccount {
    email: string;
    password: string;
    name: string;
}

interface LoginUserAccount {
    email: string;
    password: string;
}

interface IHubItem {
    title: string;
    volume: string;
    totalFunding: string;
    latestRound: string;
    employees: string;
    category: string[];
    location: string;
    growth: string;
    description: string;
}

interface IProductItem {
    name: string;
    description: string;
    growth: string;
    salesVolume: string;
    totalRevenue: string;
    latestVersion: string;
    stock: string;
    categories: string[];
    location: string;
}

// Initialize Appwrite Client
const appwriteClient = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId);

// Initialize the Account service from Appwrite SDK
export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);

export class AppwriteService {
    // Method to create a new user account
    async createUserAccount({
        email,
        password,
        name,
    }: {
        email: string;
        password: string;
        name: string;
    }) {
        try {
            // Use Appwrite's built-in userId generation (pass ID.unique() directly)
            await account.create(ID.unique(), email, password, name);

            // Log the user in automatically after account creation
            return await this.login({ email, password });
        } catch (error: any) {
            if (error.code === 409) {
                throw new Error('User already exists. Please try logging in.');
            } else {
                throw new Error(`Account creation failed: ${error.message}`);
            }
        }
    }

    // Log in an existing user
    async login({ email, password }: { email: string; password: string }) {
        try {
            // Create a session with the provided email and password
            const session = await account.createSession(email, password);
            return session;
        } catch (error: any) {
            if (error.code === 401) {
                throw new Error('Invalid email or password.');
            } else {
                throw new Error(`Login failed: ${error.message}`);
            }
        }
    }

    // Fetch the current user's account details
    async getCurrentUser() {
        try {
            // Get the logged-in user's account details
            return await account.get();
        } catch (error: any) {
            console.warn('No user is currently logged in or an error occurred:', error);
            return null; // Return null if no user session exists
        }
    }

    // Log out the current user
    async logout() {
        try {
            // Delete the current session to log the user out
            await account.deleteSession('current');
        } catch (error: any) {
            console.error('Error during logout:', error);
            throw new Error('Failed to log out. Please try again.');
        }
    }

    // Method to save a hub item to the database with a user reference
    async saveHubItem(userId: string, hubItem: IHubItem) {
        try {
            // Save the hub item to the database
            return await databases.createDocument(
                env.appwrite.databaseId,
                env.appwrite.hubItemCollectionId,
                ID.unique(),
                { ...hubItem, userId }
            );
        } catch (error: any) {
            throw new Error(`Failed to save hub item: ${error.message}`);
        }
    }


    async saveProductItem(userId: string, productItem: IProductItem) {
        try {
            // Save the product item to the database
            return await databases.createDocument(
                env.appwrite.databaseId,
                env.appwrite.productItemCollectionId,
                ID.unique(),
                { ...productItem, userId }
            );
        } catch (error: any) {
            throw new Error(`Failed to save product item: ${error.message}`);
        }
    }
}

// Export an instance of the AppwriteService
const appwriteService = new AppwriteService();
export default appwriteService;
