"use client"

import { ClientContext } from "@/context/ClientContext"
import { distanceInKmBetweenEarthCoordinates } from "@/lib/utils"
import Cafe from "@/models/Cafe"
import { MousePointer2, Plus, Search, Star } from "lucide-react"
import Link from "next/link"
import { FC, ReactNode, useContext, useEffect, useState } from "react"
import { Tag } from "./TagSelect"

interface CafeListProps {}
interface Cafe {
  _id: string
  name: string
  rating: number
  tags: Tag[]
  latitude: number
  longitude: number
}

export const CafeList: FC<CafeListProps> = ({}) => {
  const [availableCafe, setAvailableCafe] = useState<Cafe[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [serachValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    ;(async () => {
      setAvailableCafe(await (await fetch("/api/cafe")).json())
      setIsLoading(false)
    })()
  }, [])

  return (
    <div className='flex flex-col gap-2.5 flex-grow h-full overflow-y-auto'>
      <div className='sticky top-0 z-10 flex px-4 py-3 border-b border-zinc-500 bg-zinc-950'>
        <div className='flex px-2 py-1 gap-2 flex-grow rounded-full bg-zinc-900'>
          <Search size={24} />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className='w-full bg-transparent outline-none text-zinc-100 placeholder:text-zinc-400 text-base leading-6 font-normal'
            type='text'
            placeholder='Wyszukaj...'
            value={serachValue}
          />
        </div>
      </div>
      <NewCafeElement />
      {isLoading && <div>LOADING...</div>}
      {availableCafe
        .filter((cafe) => cafe.name.startsWith(serachValue))
        .map((cafe) => (
          <CafeListElement key={cafe._id} cafe={cafe} />
        ))}
    </div>
  )
}

const NewCafeElement = () => {
  return (
    <Link href={"app/cafe/new"} className='flex p-4 gap-4 bg-zinc-950 '>
      <div className='grid place-items-center w-16 h-16 text-zinc-400 border-zinc-400 border-dashed border-2 rounded-full '>
        <Plus />
      </div>

      <div className='flex flex-col py-2 flex-grow justify-between items-start'>
        <div className='text-zinc-100 text-base leading-6 font-medium'>Nowa kawiarnia</div>
        <div className='text-zinc-300 text-sm leading-5 font-normal'>KIlknij aby dodać nową kawiarnie...</div>
      </div>
    </Link>
  )
}
interface CafeListElementProps {
  cafe: Cafe
}
const CafeListElement: FC<CafeListElementProps> = ({ cafe }) => {
  const { geolocationPosition } = useContext(ClientContext)

  let distance = 0
  let isMeterScale = false
  if (geolocationPosition) {
    distance = distanceInKmBetweenEarthCoordinates(
      geolocationPosition?.coords.latitude ?? 0,
      geolocationPosition?.coords.longitude ?? 0,
      cafe.latitude,
      cafe.longitude
    )
    if (distance < 1000) {
      isMeterScale = true
      distance *= 1000
    }
  }

  return (
    <Link href='/app/cafe/cafeId' className='flex p-4 gap-4 bg-zinc-950 '>
      <img
        className='w-16 h-16 rounded-full'
        src='https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg'
        alt='xD'
      />

      <div className='flex flex-col gap-2 flex-grow overflow-hidden'>
        <div className='flex justify-between'>
          <div className='text-zinc-100 text-lg leading-6 font-medium'>{cafe.name}</div>
          <div className='flex py-1 px-3 items-center gap-1 rounded-lg bg-zinc-900/75'>
            <span className='text-sm leading-4 font-medium text-zinc-100'>{cafe.rating}</span>
            <Star className='fill-yellow-500 stroke-yellow-500' size={20} />
          </div>
        </div>

        <CafeTagList>
          {geolocationPosition && (
            <CafeTag
              Icon={<MousePointer2 className='fill-zinc-300 stroke-zinc-300' size={20} />}
              name={`${new Intl.NumberFormat("pl-PL", { maximumSignificantDigits: 3 }).format(distance)} ${
                isMeterScale ? "m" : "Km"
              }`}
            />
          )}
          {cafe.tags.map((tag) => (
            <CafeTag key={tag._id} name={tag.name} />
          ))}
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
