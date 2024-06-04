import { Navbar } from "@/components/Navbar"
import { ClientContextProvider } from "@/contexts/ClientContext"
import { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Navbar />
      <main className='h-screen overflow-hidden flex flex-col w-full  max-w-[512px] mx-auto  pt-[73px] overflow-y-auto'>
        <ClientContextProvider>{children}</ClientContextProvider>
      </main>
    </>
  )
}
