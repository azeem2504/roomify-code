import { Client, Storage, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Use your Appwrite instance URL
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Project ID from .env

const storage = new Storage(client);

export { storage, ID };
