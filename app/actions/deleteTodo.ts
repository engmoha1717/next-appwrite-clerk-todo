"use server"
import { databases } from "@/config/appwrite";
// import { auth } from "@clerk/nextjs/server";

export async function deleteTodo(id: string) {
    try {
        // const {userId} =await auth()
        console.log(id, "deleteTodo");
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODO as string,
            id
        )
        return {success:' deleted'}
    } catch (error) {
        console.error(error);
        return {error:" error deleting todo"}
    }
  
}