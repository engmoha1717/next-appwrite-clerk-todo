"use server"
import { databases } from "@/config/appwrite";
import { todoFormSchema } from "@/types/todo";
import { z } from "zod";

export async function updateTodo(todoId: string, formData: z.infer<typeof todoFormSchema>) {
     
    try {
        const validatedData = todoFormSchema.parse(formData)

        // update todo
        const res = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODO as string,
            todoId,
            {
                title: validatedData.title,
                dueDate: validatedData.dueDate.toISOString(),
            }
        )
        return {
            success: true,
            todo: res
        }
    } catch (error) {
        console.log(error)
        // throw new Error(error
        return {
            success: false,
            error: "Something went wrong"
        }
    }
}