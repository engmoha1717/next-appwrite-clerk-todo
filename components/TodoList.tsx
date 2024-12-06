import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '@/types/todo';
 

interface TodoListProps  {
  todos : Todo[];
  title: string;
  // onToggle: (id: number) => void;
}

function TodoList({todos,title}:TodoListProps) {
   
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
    
    {/* Todo Items */}
    <ul 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      // Adjusts the grid to be 1 column on small screens, 2 on medium, and 3 on large
    >
      {todos.map((todo) => (
        <TodoItem key={todo.$id} todo={todo} />
      ))}
    </ul>
  </div>
  )
}

export default TodoList