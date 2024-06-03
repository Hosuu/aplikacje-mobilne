"use client"

import { addVisitFormAction } from "@/actions/addVisitFormAction"
import { CafeGetResponse } from "@/app/api/cafe/route"
import { ClientContext } from "@/contexts/ClientContext"
import { distanceInKmBetweenEarthCoordinates } from "@/lib/utils"
import { CalendarClockIcon, Check, Frown, Loader2, LucideCalendarCheck, RefreshCcw } from "lucide-react"
import { FC, useContext, useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

interface VisitControllerProps {}

export const VisitController: FC<VisitControllerProps> = ({}) => {
  const { cafes, geolocationPosition, updateGeoLocation, isLoadingGeo } = useContext(ClientContext)
  const [filtredCafe, setFiltredCafe] = useState<CafeGetResponse[]>([])

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

  // filtredCafe.length = 0

  return (
    <div className={`flex flex-col flex-grow gap-2`}>
      {filtredCafe.map((c, i) => (
        <AddVisitCafeElement key={i} {...c} />
      ))}

      {/* No cafes found message */}
      {filtredCafe.length === 0 && (
        <div className='flex flex-col items-center'>
          <Frown size={64} className='my-4' />
          <div className='text-xl text-zinc-400 mb-4'>Nie znaleziono kawiarni w zasiegu 100m</div>
          <div
            className='flex gap-2 py-2 px-4 mt-2 rounded-2xl bg-zinc-100 text-sm leading-5 font-medium text-zinc-900 cursor-pointer'
            onClick={() => !isLoadingGeo && updateGeoLocation()}>
            {isLoadingGeo ? (
              <>
                Odświeżanie danych geolokalizacyjnych... <RefreshCcw className='animate-spin' size={20} />
              </>
            ) : (
              <>
                Odśwież dane geolokalizacji <RefreshCcw size={20} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface AddVisitCafeElementProps {
  _id: string
  name: string
  address: string
}

const AddVisitCafeElement: FC<AddVisitCafeElementProps> = ({ _id, name, address }) => {
  const [result, dispatch] = useFormState(addVisitFormAction, undefined)
  return (
    <form action={dispatch}>
      <div className='flex p-4 gap-4 bg-zinc-950'>
        <div className='flex flex-col gap-2 flex-grow overflow-hidden'>
          <div className='text-zinc-100 text-lg leading-6 font-medium text-ellipsis text-nowrap overflow-hidden'>
            {name}
          </div>
          <div className='text-xs text-zinc-400'>{address}</div>
        </div>
        <input type='hidden' name='cafeId' value={_id} />
        <AddVisitBtn state={result != undefined ? (result.success ? "SUCCESS" : "ERROR") : "INITIAL"} />
      </div>
    </form>
  )
}

interface AddVisitBtnProps {
  state: "INITIAL" | "SUCCESS" | "ERROR"
}

const AddVisitBtn: FC<AddVisitBtnProps> = ({ state }) => {
  const { pending } = useFormStatus()
  const didSucced = state === "SUCCESS"
  const didError = state === "ERROR"

  console.log(state)

  const stateLabelMap = {
    INITIAL: (
      <>
        Dodaj wizytę <LucideCalendarCheck className='ml-2' />
      </>
    ),
    SUCCESS: (
      <>
        Dodano <Check className='ml-2' />
      </>
    ),
    ERROR: (
      <>
        Spróbuj Jutro! <CalendarClockIcon className='ml-2' />
      </>
    ),
  }

  const PendingLabel = <Loader2 className='animate-spin' />

  return (
    <button
      type='submit'
      disabled={pending || didSucced || didError}
      className={`flex px-3 justify-center items-center rounded-lg bg-zinc-900/75 flex-shrink-0 text-sm leading-4 font-medium text-nowrap ${
        didSucced ? "text-green-500" : didError ? "text-red-500" : "text-zinc-300 hover:text-zinc-100"
      } disabled:cursor-not-allowed`}>
      {pending ? PendingLabel : stateLabelMap[state]}
    </button>
  )
}
