"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserProfile } from "@clerk/nextjs"
import { UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserNav() {
//   const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    // logout()
    router.push('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserCircle className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">user?.name</p>
            <p className="text-xs leading-none text-muted-foreground">
              user?.email
              <UserProfile/>
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}