"use client"

import { FC, ReactNode, createContext, useLayoutEffect, useState } from "react"

interface ClientContextSchema {
  geolocationPosition: GeolocationPosition | null
  cafes: []
}

export const ClientContext = createContext<ClientContextSchema>({ geolocationPosition: null, cafes: [] })

interface ClientContextProviderProps {
  children: ReactNode
}

export const ClientContextProvider: FC<ClientContextProviderProps> = ({ children }) => {
  const [geolocationPosition, setGeolocationPosition] = useState<GeolocationPosition | null>(null)

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(setGeolocationPosition)
    console.log("Zapytalem o lokalizacje")
  }, [])

  return <ClientContext.Provider value={{ geolocationPosition, cafes: [] }}>{children}</ClientContext.Provider>
}
