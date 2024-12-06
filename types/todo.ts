// import { z } from "zod";

// export interface Todo {
//   $id: string;
//   $createdAt: string;
//   title: string;
//   completed: boolean;
//   dueDate: string;
//   userId: string;
// }

// export const todoFormSchema = z.object({
//   title: z
//     .string()
//     .min(1, "Title is required")
//     .max(100, "Title must be less than 100 characters"),
//   dueDate: z.date({
//     required_error: "Due date is required",
//   }),
// });

// export type TodoFormData = z.infer<typeof todoFormSchema>;

// // Create a type that matches the Appwrite document structure
// export type TodoCreateData = Omit<Todo, '$id' | '$createdAt'>;

 

import { z } from "zod";
export interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  completed: boolean;
  dueDate: string;
  userId: string;
}

export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
    dueDate: z.preprocess(
      (value) => {
        // Convert string input into Date
        if (typeof value === "string") {
          return new Date(value);
        }
        return value;
      },
      z.date({ required_error: "Due date is required" }) )
  // dueDate: z.date({
  //   required_error: "Due date is required",
  // }),
});

export type TodoFormData = z.infer<typeof todoFormSchema>;