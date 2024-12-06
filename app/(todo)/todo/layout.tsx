import { ClipboardList } from "lucide-react"
import Link from "next/link"
import SideBar from "@/components/SideBar"
import { UserButton } from "@clerk/nextjs"

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/todo" className="flex items-center space-x-2">
            <ClipboardList className="h-6 w-6" />
            <span className="text-xl font-bold">TodoApp</span>
          </Link>
          {/* <UserNav /> */}
          <UserButton/>
        </div>
      </header>
      <div className="flex">
       <SideBar/>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}











// import TodoNavbar from "@/components/TodoNavbar";
// import type { Metadata } from "next";
  

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
    
//        <>
//         <TodoNavbar/>
//         <main className="flex-1 bg-purple-600 h-screen p-6">{children}</main>
//      </>
    
//   );
// }