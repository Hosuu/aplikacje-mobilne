"use client"

import { useState } from "react"

export const CafeReviewBody = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div onClick={() => setIsExpanded((prev) => !prev)}>
      <div className={`text-sm leading-5 font-normal text-zinc-200 text-ellipsis ${!isExpanded && "line-clamp-3"}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra efficitur mollis. Ut tincidunt, enim
        et dapibus accumsan, felis lectus luctus mi, eget gravida libero augue non turpis. Suspendisse potenti. Quisque
        tristique massa at nunc varius, at porta felis dapibus. Nulla facilisi. Integer volutpat, neque et tristique
        accumsan, nunc sapien porttitor nunc, quis lacinia felis eros vitae justo.
      </div>
      {/* {!isExpanded && <div className='text-left text-sky-600 text-xs leading-5 font-normal'>Read more...</div>} */}
    </div>
  )
}
