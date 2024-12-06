import CreateTodo from '@/components/CreateTodo'
import React from 'react'

export default function NewTodo() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Create New Todo
        </h1>
        <CreateTodo />
      </div>
    </div>
  )
}
