"use client"

import { useEffect, useState } from "react"

export default function ClientSideComp() {
  const [data, setData] = useState("Fetching...")

  const fetchData = async () => {
    const response = await fetch("api/test")
    const data = await response.text()
    setData(data)
    return data
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <div>Clientside API result: {data}</div>
}
