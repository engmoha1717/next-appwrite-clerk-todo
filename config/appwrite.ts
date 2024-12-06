//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)  // Local Appwrite endpoint
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
//   .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY as string);
//   export default client;  // Export the client instance
//   export const databases = new Databases(client);

import { Client, Databases } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
  .setKey(process.env.APPWRITE_API_KEY as string);  // Changed from NEXT_PUBLIC_APPWRITE_KEY

export default client;
export const databases = new Databases(client);
  

 