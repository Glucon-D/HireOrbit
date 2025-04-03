import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const login = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        return { user, session };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const signup = async (email, password, name) => {
    try {
        const user = await account.create('unique()', email, password, name);
        const session = await account.createEmailPasswordSession(email, password);
        return { user, session };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        return null;
    }
};
