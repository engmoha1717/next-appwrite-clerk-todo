"use server"
import { databases } from "@/config/appwrite"
import { Query } from "node-appwrite"
import { Todo } from "./type"
import { auth } from "@clerk/nextjs/server"
 

export async function getTodosByUserId() {
    const {userId } =await auth()
    console.log(userId)

    if (!userId) {
        return { 
            todos: [], 
            error: 'Not authenticated' 
        };
    }
    try {
        const res= await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODO as string,
            [Query.equal("userId", userId)]
        )
        
        return  res.documents as unknown as  Todo[] 
    } catch (error) {
        // Handle error
        console.log(error)
        return []
    }
}