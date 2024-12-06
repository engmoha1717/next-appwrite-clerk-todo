"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { todoFormSchema } from "@/types/todo"
import { useState } from "react"
import { createTodo } from "@/app/actions/createTodo"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



function CreateTodo() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
     // 1. Define your form.
  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
    //dueDate type date, 
    dueDate: new Date(),
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof todoFormSchema>) {
    setIsSubmitting(true)
    try {
        await createTodo(values)
        toast.success("Todo created successfully")
        form.reset()
        router.refresh()
       router.push("/todo")
         

    } catch (error) {
        console.error(error)
    } finally {
        setIsSubmitting(false)
    }

  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your todo title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                      ? field.value.toISOString().slice(0, 16) // Ensure proper datetime-local format
                      : ""
                  }
                  onChange={(e) => {
                    const inputDate = new Date(e.target.value); // Convert input value to Date
                    if (!isNaN(inputDate.getTime())) {
                      field.onChange(inputDate); // Pass valid date to the field
                    }
                  }}
                />
                {/* <Input
                  type="datetime-local"
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().slice(0, 16) // Format for "datetime-local"
                      : ""
                  }
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    field.onChange(selectedDate);
                  }}
                /> */}
              </FormControl>
              <FormDescription>
                Select a date and time from today or in the future
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Todo"}
        </Button>
      </form>
    </Form>
  );
}

export default CreateTodo