import { Navbar } from "@/components/Navbar"
import { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Navbar />
      <main className='flex flex-col w-full  max-w-[512px] mx-auto h-screen gap-4 pt-[89px]'>{children}</main>
    </>
  )
}
