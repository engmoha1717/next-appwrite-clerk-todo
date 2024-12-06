import React from 'react'
type Todo ={
    id: number;
    title: string;
    completed: boolean;
    dueDate: string; // Keep as string because the JSON has it as a string
  }

  type TodoItemProps = {
    todo: Todo;
  };



export default function TodoItem({todo}: TodoItemProps) {
  const curTime = new Date().getTime();
  const dueDateTime = new Date(todo.dueDate).getTime();



  // Determine the status (Completed, Pending, or Overdue)
  let statusClass = '';
  if (todo.completed) {
    statusClass = 'bg-green-500 text-white'; // Completed tasks
  } else if (dueDateTime < curTime) {
    statusClass = 'bg-red-500 text-white'; // Overdue tasks
  } else {
    statusClass = 'bg-yellow-500 text-white'; // Pending tasks
  }

  return (
    <li
     // Toggle the completion when clicked
    className={`flex items-center justify-between p-4 rounded-lg shadow-md border cursor-pointer ${statusClass}`}
  >
    <span className="font-medium text-lg">{todo.title}</span>
    <span
      className={`text-sm px-2 py-1 rounded-md ${statusClass}`}
    >
      {todo.completed ? 'Completed' : dueDateTime < curTime ? 'Overdue' : 'Pending'}
    </span>
    <span className="text-sm text-gray-600">{new Date(todo.dueDate).toLocaleString()}</span>
  </li>
  )
}
