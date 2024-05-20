import { Cat, MousePointer2, Plus, Star } from "lucide-react"
import Link from "next/link"
import { FC, ReactNode } from "react"

interface pageProps {}

export default async function Page({}: pageProps) {
  return (
    <div className='flex flex-col gap-2.5'>
      <Link href={"app/cafe/new"} className='flex p-4 gap-4 bg-zinc-950 '>
        <div className='grid place-items-center w-16 h-16 text-zinc-400 border-zinc-400 border-dashed border-2 rounded-full '>
          <Plus />
        </div>

        <div className='flex flex-col py-2 flex-grow justify-between items-start'>
          <div className='text-zinc-100 text-base leading-6 font-medium'>Nowa kawiarnia</div>
          <div className='text-zinc-300 text-sm leading-5 font-normal'>KIlknij aby dodać nową kawiarnie...</div>
        </div>
      </Link>
      <CafeListElement />
      <CafeListElement />
      <CafeListElement />
      <CafeListElement />
    </div>
  )
}

const CafeListElement = () => {
  return (
    <Link href='/app/cafe/cafeId' className='flex p-4 gap-4 bg-zinc-950 '>
      <img
        className='w-16 h-16 rounded-full'
        src='https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg'
        alt='xD'
      />

      <div className='flex flex-col gap-2 flex-grow overflow-hidden'>
        <div className='flex justify-between'>
          <div className='text-zinc-100 text-lg leading-6 font-medium'>Fauget catering</div>
          <div className='flex py-1 px-3 items-center gap-1 rounded-lg bg-zinc-900/75'>
            <span className='text-sm leading-4 font-medium text-zinc-100'>4.9</span>
            <Star className='fill-yellow-500 stroke-yellow-500' size={20} />
          </div>
        </div>

        <CafeTagList>
          <CafeTag Icon={<MousePointer2 className='fill-zinc-300 stroke-zinc-300' size={20} />} name='4.2 Km' />
          <CafeTag Icon={<Cat size={20} fill='#e6c835' stroke='#222' />} name='Koty' />
        </CafeTagList>
      </div>
    </Link>
  )
}

interface CafeTagListProps {
  children: ReactNode
}

const CafeTagList: FC<CafeTagListProps> = ({ children }) => {
  return (
    <div className='relative'>
      <div className='text-zinc-300 flex gap-2 flex-nowrap overflow-x-auto pr-24 snap-x snap-mandatory snap-always'>
        {children}
      </div>
      <div className='absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-zinc-950'></div>
    </div>
  )
}

interface CafeTagProps {
  name: string
  Icon?: ReactNode
}

const CafeTag: FC<CafeTagProps> = ({ name, Icon }) => {
  return (
    <div className='flex py-1 px-3 items-center gap-1 rounded-lg bg-zinc-900/75 flex-shrink-0 snap-start text-sm leading-4 font-medium'>
      {Icon}
      {name}
    </div>
  )
}
