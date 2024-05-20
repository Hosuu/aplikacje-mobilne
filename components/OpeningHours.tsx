"use client"

import { FC, useState } from "react"

interface OpeningHoursProps {
  timeTable: string[]
}

export const OpeningHours: FC<OpeningHoursProps> = ({ timeTable }) => {
  const currentDay = new Date().getDay()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  return (
    <div onClick={() => setIsExpanded((p) => !p)}>
      <div className='flex flex-row py-2 justify-between items-center border-b border-zinc-900 text-base leading-5 font-normal'>
        <div className='text-zinc-400 self-start'>Godziny otwarcia</div>
        <div className='text-zinc-100 flex flex-col items-center gap-1 '>
          {timeTable.map((t, i) => {
            if (i != currentDay - 1 && !isExpanded) return null
            const [day, time] = t.split(": ")
            return (
              <div className='self-start flex justify-between w-full items-center' key={i}>
                <div className={`text-sm text-zinc-400 mr-4 ${isExpanded && i == currentDay - 1 ? "font-bold" : ""}`}>
                  {day}
                </div>
                <div className='text-zinc-100'>{time.replace("–", " - ")}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
