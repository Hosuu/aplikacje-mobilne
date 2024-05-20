import { Navbar } from "@/components/Navbar"
import { ClientContextProvider } from "@/context/ClientContext"
import { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Navbar />
      <main className='flex flex-col w-full  max-w-[512px] mx-auto h-full gap-4 pt-[73px]'>
        <ClientContextProvider>{children}</ClientContextProvider>
      </main>
    </>
  )
}
