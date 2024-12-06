import { databases } from "@/config/appwrite";
import { User } from "@clerk/nextjs/server";
import { ID as AppwriteID, Query } from "node-appwrite";

export async function syncClerkToAppwrite(user: User) {
  try {
    const existingUsers = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER!,
      [Query.equal('clerkId', user.id)]
    );

    const userPayload = {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName || user.firstName,
      profileImageUrl: user.imageUrl,
    };

    if (existingUsers.total === 0) {
      // Create a new user
      return await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER!,
        AppwriteID.unique(),
        userPayload
      );
    } else {
      // Update existing user
      const existingUser = existingUsers.documents[0];
      return await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER!,
        existingUser.$id,
        userPayload
      );
    }
  } catch (error) {
    console.error("Error syncing user to Appwrite:", error);
    throw error;
  }
}











// import { databases } from "@/config/appwrite";
// import { User } from "@clerk/nextjs/server";
// import { ID as AppwriteID, Query } from "node-appwrite";

// export async function syncClerkToAppwrite(user: User) {
//   try {
//     // Fetch existing user by clerkId
//     const existingUsers = await databases.listDocuments(
//       process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
//       process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
//       [Query.equal('clerkId', user.id)]
//     );

//     if (existingUsers.total === 0) {
//       // Create a new user
//       const createdUser = await databases.createDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
//         process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
//         AppwriteID.unique(),
//         {
//           clerkId: user.id,
//           email: user.primaryEmailAddress?.emailAddress,
//           name: user.fullName || user.firstName,
//           profileImageUrl: user.imageUrl,
//         }
//       );
      
//       console.log("User created successfully:", createdUser);
//       return createdUser;
//     } else {
//       // Update existing user
//       const existingUser = existingUsers.documents[0];
//       const updatedUser = await databases.updateDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
//         process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
//         existingUser.$id,
//         {
//           clerkId: user.id,
//           email: user.primaryEmailAddress?.emailAddress,
//           name: user.fullName || user.firstName,
//           profileImageUrl: user.imageUrl,
//         }
//       );

//       console.log("User updated successfully:", updatedUser);
//       return updatedUser;
//     }
//   } catch (error) {
//     console.error("Error syncing user to Appwrite:", error);
//     throw error;
//   }
// }
















