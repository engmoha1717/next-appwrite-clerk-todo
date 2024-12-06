"use server"
import { z } from "zod"
import {    } from "./type"
import { todoFormSchema } from "@/types/todo"
import { auth } from "@clerk/nextjs/server";
import { databases } from "@/config/appwrite";

export async function createTodo( formData: z.infer<typeof todoFormSchema>) {
    
    try {
        const {userId}= await auth();
        const validatedData = todoFormSchema.parse(formData);
        const todoData ={
            title: validatedData.title,
            dueDate: validatedData.dueDate,
            completed: false,
            userId:userId
        }
        console.log("Validated form data:", todoData);
        //appwrite code to create todo in database
        const res =await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODO as string,
            "unique()",
            todoData
        )
        return {
            success:true,
            data: res,
            message: "Todo created successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        }
    }
}