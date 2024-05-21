"use client"

import { CafeGetResponse } from "@/app/api/cafe/route"
import { ClientContext } from "@/context/ClientContext"
import { distanceInKmBetweenEarthCoordinates } from "@/lib/utils"
import { LoaderCircle, MousePointer2, Plus, Search, Star } from "lucide-react"
import Link from "next/link"
import { FC, ReactNode, useContext, useEffect, useState } from "react"

interface CafeListProps {}

export const CafeList: FC<CafeListProps> = ({}) => {
  const { cafes, isLoadingCafes, geolocationPosition } = useContext(ClientContext)
  const [serachValue, setSearchValue] = useState<string>("")
  const [filtredCafe, setFiltredCafe] = useState<CafeGetResponse[]>([])

  useEffect(() => {
    if (serachValue.length > 0) {
      setFiltredCafe(
        cafes.filter((c) => {
          if (c.name.includes(serachValue)) return true
          if (c.tags.some((tag) => tag.name.includes(serachValue))) return true
          return false
        })
      )
    } else setFiltredCafe([...cafes])
  }, [serachValue, cafes])

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
      {isLoadingCafes && (
        <div className='flex flex-col items-center'>
          <LoaderCircle className='animate-spin stroke-zinc-400' size={48} />
          <div className='text-sm leading-5 font-normal mt-4 text-zinc-400'>Wczytuje kawiarnie...</div>
        </div>
      )}
      {filtredCafe
        .map((cafe) => {
          const distance = geolocationPosition
            ? distanceInKmBetweenEarthCoordinates(
                geolocationPosition.coords.latitude,
                geolocationPosition.coords.longitude,
                cafe.latitude,
                cafe.longitude
              )
            : -1
          return { cafe, distance }
        })
        .sort((a, b) => a.distance - b.distance)
        .map(({ cafe, distance }) => (
          <CafeListElement key={cafe.googleMapsPlaceID} cafe={cafe} distance={distance} />
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
  cafe: CafeGetResponse
  distance: number
}
const CafeListElement: FC<CafeListElementProps> = ({ cafe, distance }) => {
  const [isMeterScae, setIsMeterScale] = useState<boolean>(false)

  useEffect(() => {
    if (distance != -1) setIsMeterScale(Boolean(distance < 1))
  }, [distance])

  return (
    <Link href={`/app/cafe/${cafe.googleMapsPlaceID}`} className='flex p-4 gap-4 bg-zinc-950 '>
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
          {distance != -1 && (
            <CafeTag
              Icon={<MousePointer2 className='fill-zinc-300 stroke-zinc-300' size={20} />}
              name={`${new Intl.NumberFormat("pl-PL", { maximumSignificantDigits: 3 }).format(
                isMeterScae ? distance * 1000 : distance
              )} ${isMeterScae ? "m" : "Km"}`}
            />
          )}
          {cafe.tags.map((tag) => (
            <CafeTag key={tag.name} name={tag.name} />
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
