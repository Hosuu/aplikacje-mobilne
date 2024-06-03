"use client"

import { CafeGetResponse } from "@/app/api/cafe/route"
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"

interface ClientContextSchema {
  geolocationPosition: GeolocationPosition | null
  cafes: CafeGetResponse[]
  isLoadingCafes: boolean
  isLoadingGeo: boolean
  setIsLoadingCafes: Dispatch<SetStateAction<boolean>>
  updateCafeList: () => void
  updateGeoLocation: () => void
}

export const ClientContext = createContext<ClientContextSchema>({
  geolocationPosition: null,
  cafes: [],
  isLoadingCafes: true,
  isLoadingGeo: false,
  setIsLoadingCafes: () => null,
  updateCafeList: () => null,
  updateGeoLocation: () => null,
})

interface ClientContextProviderProps {
  children: ReactNode
}

export const ClientContextProvider: FC<ClientContextProviderProps> = ({ children }) => {
  const [geolocationPosition, setGeolocationPosition] = useState<GeolocationPosition | null>(null)
  const [isLoadingCafes, setIsLoadingCafes] = useState<boolean>(true)
  const [cafes, setCafes] = useState<CafeGetResponse[]>([])
  const [isLoadingGeo, setIsLoadingGeo] = useState<boolean>(false)

  const updateCafeList = useMemo(
    () => async () => {
      setCafes((await (await fetch("/api/cafe")).json()) as CafeGetResponse[])
      setIsLoadingCafes(false)
    },
    [setIsLoadingCafes, setCafes]
  )

  useEffect(() => {
    updateCafeList()
  }, [updateCafeList])

  const updateGeoLocation = useCallback(() => {
    setIsLoadingGeo(true)
    navigator.geolocation.getCurrentPosition((geo) => {
      setTimeout(() => {
        setGeolocationPosition(geo)
        setIsLoadingGeo(false)
      }, 1000)
    })
  }, [])

  useLayoutEffect(() => {
    updateGeoLocation()
  }, [updateGeoLocation])

  return (
    <ClientContext.Provider
      value={{
        geolocationPosition,
        cafes,
        isLoadingCafes,
        setIsLoadingCafes,
        updateCafeList,
        updateGeoLocation,
        isLoadingGeo,
      }}>
      {children}
    </ClientContext.Provider>
  )
}
