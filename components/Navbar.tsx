"use client"

import { signOutAction } from "@/app/auth/logout/actions"
import { CircleUserRound, LogOut, LucideIcon, Undo2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FC } from "react"

export const Navbar: FC = () => {
  const router = useRouter()

  const returnBtn = <NavbarButton IconElement={Undo2} onClick={async () => router.back()} />
  const profileBtn = (
    <Link href='/app/profile'>
      <NavbarButton IconElement={CircleUserRound} />
    </Link>
  )

  const isAppRootDir = usePathname() == "/app"

  return (
    <div className='fixed top-0 w-full z-50'>
      <div className='flex flex-row p-4 justify-between items-center border-b border-zinc-500 border-solid bg-zinc-950 w-full  max-w-[512px] mx-auto'>
        {isAppRootDir ? profileBtn : returnBtn}
        <div className='text-4xl leading-10 font-medium text-white select-none'>WroKawka</div>
        <form action={signOutAction}>
          <button tabIndex={-1}>
            <NavbarButton IconElement={LogOut} />
          </button>
        </form>
      </div>
    </div>
  )
}

interface NavbarButtonProps {
  IconElement: LucideIcon
  onClick?: () => void
}

const NavbarButton: FC<NavbarButtonProps> = ({ IconElement, onClick }) => {
  return (
    <div className='flex p-2 items-center rounded-xl bg-zinc-900' onClick={onClick}>
      <IconElement />
    </div>
  )
}
