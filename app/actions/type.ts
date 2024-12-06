import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().default(false),
  dueDate: z.string().optional(),
  userId: z.string()
});

export type Todo = {
  $id: string;
  $createdAt: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  userId: string;
};