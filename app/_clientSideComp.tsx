"use client"

import { useEffect, useState } from "react"

export default function ClientSideComp() {
  const [data, setData] = useState("Fetching...")

  const fetchData = async () => {
    const start = performance.now()
    const response = await fetch("api/test")
    const time = Math.floor(performance.now() - start)
    const data = await response.text()
    setData(data + ` in ${time}ms`)
    return data
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='text-center'>
      Clientside API result: <p>{data}</p>
    </div>
  )
}
