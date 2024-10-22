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

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);

export class AppwriteService {
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            await account.create(ID.unique(), email, password, name);
            return this.login({ email, password });
        } catch (error) {
            if (error instanceof Error) {
                if ((error as any).code === 409) {
                    throw new Error('User already exists');
                }
                throw new Error(`Account creation failed: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred during account creation.');
            }
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createSession(email, password);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Login failed: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred during login.');
            }
        }
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.warn('No user is currently logged in or an error occurred:', error);
            return null;
        }
    }

    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error('Error during logout:', error);
            throw new Error('Failed to log out. Please try again.');
        }
    }

    async saveHubItem(userId: string, hubItem: IHubItem) {
        try {
            return await databases.createDocument(
                env.appwrite.databaseId,
                env.appwrite.hubItemCollectionId,
                ID.unique(),
                { ...hubItem, userId }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to save hub item: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving the hub item.');
            }
        }
    }

    async saveProductItem(userId: string, productItem: IProductItem) {
        try {
            return await databases.createDocument(
                env.appwrite.databaseId,
                env.appwrite.productItemCollectionId,
                ID.unique(),
                { ...productItem, userId }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to save product item: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving the product item.');
            }
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;
