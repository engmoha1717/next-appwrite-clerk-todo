import React from 'react'
// import Todos  from '@/todo.json'
import TodoList from '@/components/TodoList';
import { Todo } from '@/types/todo';

//import { getAllTodos } from '@/app/actions/todos';
import { getTodosByUserId } from '@/app/actions/getTodoByUserId';
 


export default async function TodoPage() {

  // const user = await currentUser() 
  // const todos = await getAllTodos()
  // const todos = await getAllTodos() as Todo[];
  const todos = await getTodosByUserId() as Todo[];
  console.log(todos)
 
  // const todos = Todos;
  const curTime= new Date().getTime();
  
  const inComing:Todo[] = todos!.filter((todo => new Date(todo.dueDate).getTime() > curTime))
  const overdue:Todo[] = todos!.filter((todo => new Date(todo.dueDate).getTime() < curTime))
  console.log(overdue)
   
  return (
    <div>
    <TodoList todos={inComing} title="In Coming"/>
    {/* <TodoList todos={overdue} title="Overdue"/> */}
    </div>
  )
}

