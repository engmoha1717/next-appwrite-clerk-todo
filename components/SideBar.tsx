import { ClipboardList, InboxIcon, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

function SideBar() {
  return (
    <aside className="w-64 border-r bg-white p-4 dark:bg-gray-800 min-h-[calc(100vh-4rem)]">
    <nav className="space-y-2">
      <Link href="/todo/new">
        <Button variant="outline" className="w-full justify-start">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create Todo
        </Button>
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
  </aside>
  )
}

export default SideBar