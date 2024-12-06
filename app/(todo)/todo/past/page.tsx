import React from 'react'
// import Todos  from '@/todo.json'
import TodoList from '@/components/TodoList';
import { getAllTodos } from '@/app/actions/todos';
import { Todo } from '@/types/todo';
// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
//   dueDate: string; // Keep as string because the JSON has it as a string
// }

async function TodoPast() {
  // const todos:Todo[]  = Todos;
  const todos= await getAllTodos() as Todo[]
  const curTime= new Date().getTime();
  const overdue = todos.filter(todo => new Date(todo.dueDate).getTime() < curTime);
  return (
    <div>
      {/* <TodoList todos={overdue} title="Overdue"/> */}
      <TodoList todos={overdue} title="Past"/>
    </div>
  )
}

export default TodoPast