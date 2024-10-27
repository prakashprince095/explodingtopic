import { Client, Databases } from 'appwrite';
import env from '@/app/env';

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint(env.appwrite.endpoint).setProject(env.appwrite.projectId);

const databases = new Databases(client);

// Functions for CRUD operations on HubItem collection
export const createHubItem = async (hubItem: IHubItem) => {
    return await databases.createDocument(
        env.appwrite.databaseId,
        env.appwrite.hubItemCollectionId,
        'unique()',
        hubItem
    );
};

export const updateHubItem = async (hubItemId: string, hubItem: Partial<IHubItem>) => {
    return await databases.updateDocument(
        env.appwrite.databaseId,
        env.appwrite.hubItemCollectionId,
        hubItemId,
        hubItem
    );
};

export const getHubItem = async (hubItemId: string) => {
    return await databases.getDocument(
        env.appwrite.databaseId,
        env.appwrite.hubItemCollectionId,
        hubItemId
    );
};

export const deleteHubItem = async (hubItemId: string) => {
    return await databases.deleteDocument(
        env.appwrite.databaseId,
        env.appwrite.hubItemCollectionId,
        hubItemId
    );
};

// Functions for CRUD operations on ProductItem collection
export const createProductItem = async (productItem: IProductItem) => {
    return await databases.createDocument(
        env.appwrite.databaseId,
        env.appwrite.productItemCollectionId,
        'unique()',
        productItem
    );
};

