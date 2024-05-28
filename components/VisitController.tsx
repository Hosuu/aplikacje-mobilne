"use client"

import { CafeGetResponse } from "@/app/api/cafe/route"
import { ClientContext } from "@/contexts/ClientContext"
import { distanceInKmBetweenEarthCoordinates } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { FC, useContext, useEffect, useState } from "react"

interface VisitControllerProps {}

export const VisitController: FC<VisitControllerProps> = ({}) => {
  const { cafes, isLoadingCafes, geolocationPosition } = useContext(ClientContext)
  const [filtredCafe, setFiltredCafe] = useState<CafeGetResponse[]>([])

  const router = useRouter()

  useEffect(() => {
    if (geolocationPosition) {
      const {
        coords: { latitude: lat2, longitude: lng2 },
      } = geolocationPosition!
      setFiltredCafe(
        cafes.filter(({ latitude: lat1, longitude: lng1 }) => {
          const distance = distanceInKmBetweenEarthCoordinates(lat1, lng1, lat2, lng2)
          return distance < 0.1
        })
      )
    }
  }, [cafes, geolocationPosition])

  return (
    <div className='flex flex-col items-center'>
      <div className='text-xl leading-6 font-semibold text-center mt-4'>Kawiarnie w zasiegu 100m</div>
      <div className='text-xs text-zinc-400 mb-4'>Not yet working!</div>
      <ol>
        {filtredCafe.map((c, i) => (
          <li key={c._id}>
            {i + 1}. {c.name}
          </li>
        ))}
      </ol>

      <div
        onClick={() => router.back()}
        className='bg-sky-600 hover:bg-sky-800  rounded-full text-center py-2 px-5 mt-8'>
        Powrót
      </div>
    </div>
  )
}
