import conf from "@/conf/config";
import { Client, Account, ID } from 'appwrite';

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
};

type LoginUserAccount = {
    email: string,
    password: string,
};

const appwriteClient = new Client();
appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
    // Create a new user account in Appwrite
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            await account.create(ID.unique(), email, password, name);
            return this.login({ email, password }); // Automatically log in after signup
        } catch (error: any) {
            if (error.code === 409) { // 409: User already exists
                throw new Error('User already exists');
            }
            throw error;
        }
    }

    // Log the user in
    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createSession(email, password); // Start a new session
        } catch (error: any) {
            throw error;
        }
    }

    // Get the current logged-in user
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    }

    // Log out the current user
    async logout() {
        try {
            return await account.deleteSession('current');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
}
const appwriteService = new AppwriteService();
export default appwriteService;
