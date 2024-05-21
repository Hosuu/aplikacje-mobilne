"use client"

import { CafeGetResponse } from "@/app/api/cafe/route"
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"

interface ClientContextSchema {
  geolocationPosition: GeolocationPosition | null
  cafes: CafeGetResponse[]
  isLoadingCafes: boolean
  setIsLoadingCafes: Dispatch<SetStateAction<boolean>>
  fetchCafe: () => void
}

export const ClientContext = createContext<ClientContextSchema>({
  geolocationPosition: null,
  cafes: [],
  isLoadingCafes: true,
  setIsLoadingCafes: () => null,
  fetchCafe: () => null,
})

interface ClientContextProviderProps {
  children: ReactNode
}

export const ClientContextProvider: FC<ClientContextProviderProps> = ({ children }) => {
  const [geolocationPosition, setGeolocationPosition] = useState<GeolocationPosition | null>(null)
  const [isLoadingCafes, setIsLoadingCafes] = useState<boolean>(true)
  const [cafes, setCafes] = useState<CafeGetResponse[]>([])

  const fetchCafe = useMemo(
    () => async () => {
      setCafes((await (await fetch("/api/cafe")).json()) as CafeGetResponse[])
      setIsLoadingCafes(false)
    },
    [setIsLoadingCafes, setCafes]
  )

  useEffect(() => {
    fetchCafe()
  }, [fetchCafe])

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(setGeolocationPosition)
    console.log("Zapytalem o lokalizacje")
  }, [])

  return (
    <ClientContext.Provider value={{ geolocationPosition, cafes, isLoadingCafes, setIsLoadingCafes, fetchCafe }}>
      {children}
    </ClientContext.Provider>
  )
}
