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
  updateCafeList: () => void
}

export const ClientContext = createContext<ClientContextSchema>({
  geolocationPosition: null,
  cafes: [],
  isLoadingCafes: true,
  setIsLoadingCafes: () => null,
  updateCafeList: () => null,
})

interface ClientContextProviderProps {
  children: ReactNode
}

export const ClientContextProvider: FC<ClientContextProviderProps> = ({ children }) => {
  const [geolocationPosition, setGeolocationPosition] = useState<GeolocationPosition | null>(null)
  const [isLoadingCafes, setIsLoadingCafes] = useState<boolean>(true)
  const [cafes, setCafes] = useState<CafeGetResponse[]>([])

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

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(setGeolocationPosition)
  }, [])

  return (
    <ClientContext.Provider value={{ geolocationPosition, cafes, isLoadingCafes, setIsLoadingCafes, updateCafeList }}>
      {children}
    </ClientContext.Provider>
  )
}
