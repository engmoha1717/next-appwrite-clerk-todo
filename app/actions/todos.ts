
import { databases } from "@/config/appwrite";
import { Todo } from "./type";
 
export async function getAllTodos() {
  try {
    const response =await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TODO as string);
      return response.documents as unknown as Todo[];
  } catch (error) {
    console.error('Error fetching all todos:', error);
    return [];
  }
}

 