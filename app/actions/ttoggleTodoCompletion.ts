"use server"
import { databases } from "@/config/appwrite";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export  async function toggleTodoCompletion(todoId: string) {
    const { userId } = await auth();

    if (!userId) {
      return { error: 'Not authenticated' };
    }
    try {
        const curTodo =await databases.getDocument( 
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODO as string,
            todoId);

        const updatedTodo = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODO as string,
            todoId,
            {
                // completed: !curTodo.isCompleted
                completed: !curTodo.completed
            }
        )
        revalidatePath("/todo")
        revalidatePath("/todo/past")
        return {
            todo:updatedTodo,
            success: true,
            message: "Todo updated successfully"
            
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Error updating todo"
            }
    }
    
}