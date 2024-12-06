import React from 'react'
import TodoItem from './TodoItem'


interface Todo {
    id: number;
    title: string;
    completed: boolean;
    dueDate: string; // Keep as string because the JSON has it as a string
  }

interface TodoListProps {
    todos: Todo[]; // Array of Todo items
    title: string; // Title for the list
  }
  

  // onToggleComplete
  const onToggleComplete= (id: number) => {
    // Find the todo item with the given id
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      // Toggle the completed property of the todo item
      todo.completed = !todo.completed;
    }
  }



export default function TodoList({todos,title}: TodoListProps) {
    
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">{title}</h2>
      {todos.length > 0 ? (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tasks available.</p>
      )}
    </div>
  )
}
