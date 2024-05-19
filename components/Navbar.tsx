"use client"

import { CircleUserRound, LogOut, LucideIcon, Undo2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FC } from "react"

export const Navbar: FC = () => {
  const router = useRouter()

  const ReturnButton = (<div className='flex p-2 items-center rounded-xl bg-zinc-900 cursor-pointer' onClick={() => router.back()}> <Undo2 /> </div>) //prettier-ignore
  const ProfileButton = <NavbarButton url='/app/profile' IconElement={CircleUserRound} />

  return (
    <div className='fixed top-0 w-full'>
      <div className='flex flex-row p-4 justify-between items-center border-b border-zinc-400 border-solid bg-zinc-950 w-full  max-w-[512px] mx-auto'>
        {usePathname() != "/app" ? ReturnButton : ProfileButton}
        <div className='text-4xl leading-10 font-medium text-white select-none'>WroKawka</div>
        <NavbarButton url='/logout' IconElement={LogOut} />
      </div>
    </div>
  )
}

interface NavbarButtonProps {
  IconElement: LucideIcon
  url: string
}

const NavbarButton: FC<NavbarButtonProps> = ({ IconElement, url }) => {
  return (
    <Link href={url} className='flex p-2 items-center rounded-xl bg-zinc-900'>
      <IconElement />
    </Link>
  )
}
