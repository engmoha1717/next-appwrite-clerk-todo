import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { ClipboardList } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {


  const user = await auth(); // Get the user object
  
  
  if (user?.userId) {
    redirect("/todo")
  }
   
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-lg flex gap-x-3 font-bold text-gray-900 dark:text-white
            hover:text-gray-700 dark:hover:text-gray-200">
            <ClipboardList className="h-6 w-6" />
            <span className="text-xl font-bold">TodoApp</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to access your todos
            </p>
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
                {/* Ensure link is clickable */}
                <Link
                  href="/todo"
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Todo
                </Link>
              </SignedIn>
            </header>
         
            
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800">
             <div className="mt-4 text-center text-sm text-gray-500">
              Demo credentials:<br />
              Email: user@example.com<br />
              Password: password
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}




