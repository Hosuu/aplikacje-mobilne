"use client"

import { useState } from "react"

export const CafeReviewBody = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div onClick={() => setIsExpanded((prev) => !prev)}>
      <div className={`text-sm leading-5 font-normal text-zinc-200 text-ellipsis ${!isExpanded && "line-clamp-3"}`}>
        {text}
      </div>
      {/* {!isExpanded && <div className='text-left text-sky-600 text-xs leading-5 font-normal'>Read more...</div>} */}
    </div>
  )
}
