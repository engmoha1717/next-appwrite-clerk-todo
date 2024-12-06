import { ClipboardList, InboxIcon, LogOutIcon, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function TodoNavbar() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/todo" className="flex items-center space-x-2">
            <ClipboardList className="h-6 w-6" />
            <span className="text-xl font-bold">TodoApp</span>
          </Link>user button
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 border-r bg-white p-4 dark:bg-gray-800 min-h-[calc(100vh-4rem)]">
          <nav className="space-y-2">
            <Link href="/todo/new">
              <button   className="w-full justify-start">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Todo
              </button>
            </Link>
            <Link href="/todo">
              <Button variant="ghost" className="w-full justify-start">
                <InboxIcon className="mr-2 h-4 w-4" />
                Incoming Todos
              </Button>
            </Link>
            <Link href="/todo/past">
              <Button variant="ghost" className="w-full justify-start">
                <ClipboardList className="mr-2 h-4 w-4" />
                Past Todos
              </Button>
            </Link>
          </nav>
          <div className="absolute bottom-4">
            <form action="/auth/sign-out" method="post">
              <Button variant="ghost" className="w-full justify-start text-red-500">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </aside>
       
      </div>
    </div>
  )
}

{/* <main className="flex-1 p-6">{children}</main> */}