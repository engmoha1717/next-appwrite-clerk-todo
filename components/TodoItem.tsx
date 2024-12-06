"use client"
import React, { useState, useTransition } from "react";
import { TimerIcon, CheckCircleIcon, AlertCircleIcon, Trash2Icon, EditIcon } from "lucide-react";
import { Todo, todoFormSchema } from "@/types/todo";
import { toast } from "sonner";
 import { deleteTodo } from "@/app/actions/deleteTodo";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateTodo } from "@/app/actions/updateTodo";
import { toggleTodoCompletion } from "@/app/actions/ttoggleTodoCompletion";

function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form for editing todo
  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todo.title,
      dueDate: new Date(todo.dueDate)
    }
  });

  const handleToggleCompletion = () => {
    startTransition(async () => {
      const result = await toggleTodoCompletion(todo.$id);
      if (result.success) {
        setIsCompleted(!isCompleted);
        toast.success(
          isCompleted 
            ? "Todo marked as pending" 
            : "Todo marked as completed"
        );
      } else {
        toast.error("Failed to update todo");
      }
    });
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteTodo(todo.$id);
      if (result?.success) {
        toast.success("Todo deleted successfully");
        router.refresh();
      } else {
        toast.error(result?.error || "Failed to delete todo");
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  const onSubmit = async (values: z.infer<typeof todoFormSchema>) => {
    try {
      const result = await updateTodo(todo.$id, values);
      if (result.success) {
        toast.success("Todo updated successfully");
        setIsEditing(false);
        router.refresh();
      } else {
        toast.error("Failed to update todo");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the todo");
    }
  }

  // Render editing form
  if (isEditing) {
    return (
      <li className="border border-gray-300 rounded-lg p-4 bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your todo title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={
                        field.value instanceof Date && !isNaN(field.value.getTime())
                          ? field.value.toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) => {
                        const inputDate = new Date(e.target.value);
                        if (!isNaN(inputDate.getTime())) {
                          field.onChange(inputDate);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </li>
    );
  }

  // Regular todo item view
  return (
    <li
    className="flex flex-col gap-4 border border-gray-300 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300 sm:p-5 lg:p-6">
    <div className="flex justify-between items-start">
      {/* Task Title */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <h1
            className={`text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600 transition-colors ${
              isCompleted ? 'line-through decoration-2' : ''
            }`}
            title={todo.title}
          >
            {todo.title}
          </h1>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Todo Details
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Title</h3>
              <p className="mt-1 text-lg text-gray-900">{todo.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className={`mt-1 text-lg font-medium ${
                isCompleted ? "text-green-600" : "text-red-600"
              }`}>
                {isCompleted ? "Completed" : "Pending"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(todo.dueDate).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        {/* Edit Button */}
        {isCompleted ? null :
         <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
          title="Edit todo">
          <EditIcon className="w-5 h-5" />
        </button>
        }
       

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
          title="Delete todo">
          <Trash2Icon className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Rest of the component remains the same as before */}
    <p className={`text-sm sm:text-base lg:text-lg font-medium flex items-center gap-2 ${
        isCompleted ? "text-green-600" : "text-red-600"}`}>
      {isCompleted ? (
        <>
          <CheckCircleIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          Completed
        </>
      ) : (
        <>
          <AlertCircleIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          Pending
        </>
      )}
    </p>

    <div className="flex flex-col gap-3 mt-2">
      <h4
        className="flex items-center gap-2 text-sm sm:text-base lg:text-lg text-gray-600"
      >
        <TimerIcon className="text-gray-500 w-4 h-4 lg:w-5 lg:h-5" />
        {new Date(todo.dueDate).toLocaleDateString(
        undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
      </h4>

      <button
        onClick={handleToggleCompletion}
        disabled={isPending || isDeleting}
        className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none 
          ${isCompleted
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
          } transition-all duration-200 w-full ${(isPending || isDeleting) ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isPending 
          ? "Updating..." 
          : (isCompleted ? "Mark as Pending" : "Mark as Completed")
        }
      </button>
    </div>
  </li>
  );
}

export default TodoItem;















// "use client"
// import React, { useState, useTransition } from "react";
// import { TimerIcon, CheckCircleIcon, AlertCircleIcon, Trash2Icon } from "lucide-react";
// import { Todo } from "@/types/todo";
// import {   toast  } from "sonner";
// import { toggleTodoCompletion } from "@/app/actions/ttoggleTodoCompletion";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// import { deleteTodo } from "@/app/actions/deleteTodo";
// import { useRouter } from "next/navigation";

// function TodoItem({ todo }: { todo: Todo }) {
//   const router = useRouter()
//   const [isCompleted, setIsCompleted] = useState(todo.completed);
//   const [isPending, startTransition] = useTransition();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isOpen , setIsOpen] = useState(false)
//   console.log(isCompleted)

//   const handleToggleCompletion = () => {
//     startTransition(async () => {
//       const result = await toggleTodoCompletion(todo.$id);
//       if (result.success) {
//         setIsCompleted(!isCompleted);
//         toast.success(
//           isCompleted 
//             ? "Todo marked as pending" 
//             : "Todo marked as completed"
//         );
//       } else {
//         toast.error("Failed to update todo");
//       }
//     })
//   }

//   const handleDelete = async () => {
//     setIsDeleting(true);
//     try {
//       const result= await deleteTodo(todo.$id);
//       if (result?.success) {
//         toast.success("Todo deleted successfully");
//         router.refresh();
//       } else {
//         toast.error(result?.error || "Failed to delete todo");
//         setIsDeleting(false);
//       }
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setIsDeleting(false);
//     }
//   }

  
//   return (
//     <li
//     className="flex flex-col gap-4 border border-gray-300 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300 sm:p-5 lg:p-6">
//     <div className="flex justify-between items-start">
//       {/* Task Title */}
//       <div
//         className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 truncate"
//         title={todo.title}
//       >
//         See More...
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//           <DialogTrigger asChild>
//             <h1
//               className={`text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600 transition-colors ${
//                 isCompleted ? 'line-through decoration-2' : ''
//               }`}
//               title={todo.title}
//             >
//               {todo.title}
//             </h1>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle className="text-2xl font-bold text-gray-900">
//                 Todo Details
//               </DialogTitle>
//             </DialogHeader>
//             <div className="mt-4 space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Title</h3>
//                 <p className="mt-1 text-lg text-gray-900">{todo.title}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Status</h3>
//                 <p className={`mt-1 text-lg font-medium ${
//                   isCompleted ? "text-green-600" : "text-red-600"
//                 }`}>
//                   {isCompleted ? "Completed" : "Pending"}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
//                 <p className="mt-1 text-lg text-gray-900">
//                   {new Date(todo.dueDate).toLocaleDateString(undefined, {
//                     weekday: 'long',
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}
//                 </p>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>  
//       </div>

//       {/* Delete Button */}
//       <button
//         onClick={handleDelete}
//         disabled={isDeleting}
//         className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
//         title="Delete todo">
//         <Trash2Icon className="w-5 h-5" />
//       </button>
//     </div>

//     {/* Completion Status */}
//     <p className={`text-sm sm:text-base lg:text-lg font-medium flex items-center gap-2 ${
//         isCompleted ? "text-green-600" : "text-red-600"}`}>
//       {isCompleted ? (
//         <>
//           <CheckCircleIcon className="w-5 h-5 lg:w-6 lg:h-6" />
//           Completed
//         </>
//       ) : (
//         <>
//           <AlertCircleIcon className="w-5 h-5 lg:w-6 lg:h-6" />
//           Pending
//         </>
//       )}
//     </p>

//     {/* Due Date and Action Button */}
//     <div className="flex flex-col gap-3 mt-2">
//       {/* Due Date */}
//       <h4
//         className="flex items-center gap-2 text-sm sm:text-base lg:text-lg text-gray-600"
//       >
//         <TimerIcon className="text-gray-500 w-4 h-4 lg:w-5 lg:h-5" />
//         {/* {new Date(todo.dueDate).toLocaleDateString()} */}
//         {new Date(todo.dueDate).toLocaleDateString(
//         undefined, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}
//       </h4>

//       <button
//         onClick={handleToggleCompletion}
//         disabled={isPending || isDeleting}
//         className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none 
//           ${isCompleted
//             ? "bg-green-500 hover:bg-green-600 text-white"
//             : "bg-red-500 hover:bg-red-600 text-white"
//           } transition-all duration-200 w-full ${(isPending || isDeleting) ? "opacity-50 cursor-not-allowed" : ""}`}
//       >
//         {isPending 
//           ? "Updating..." 
//           : (isCompleted ? "Mark as Pending" : "Mark as Completed")
//         }
//       </button>
//     </div>
//   </li>
//   );
// }

// export default TodoItem;














