"use client"

import { automaticRelativeDifference } from "@/lib/utils"
import { Star } from "lucide-react"
import Link from "next/link"
import { FC, useState } from "react"

interface CafeReviewProps {
  label: string
  url: string
  rating: number
  text: string
  timeStamp: number
}

export const CafeReview: FC<CafeReviewProps> = ({ label, url, rating, text, timeStamp }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const { duration, unit } = automaticRelativeDifference(timeStamp)
  const relativeTimeText = new Intl.RelativeTimeFormat().format(duration, unit)

  return (
    <div className='flex p-2 flex-col gap-2.5 rounded-lg bg-zinc-900/50'>
      <div className='flex justify-between items-center'>
        <Link href={url} className='text-base leading-7 font-semibold text-zinc-100'>
          {label}
        </Link>

        <StarRating rating={rating} />
      </div>

      <div onClick={() => setIsExpanded((prev) => !prev)}>
        <div className={`text-sm leading-5 font-normal text-zinc-200 text-ellipsis ${!isExpanded && "line-clamp-3"}`}>
          {text}
        </div>
        {/* {!isExpanded && <div className='text-left text-sky-600 text-xs leading-5 font-normal'>Read more...</div>} */}
      </div>

      <div className='flex justify-between items-center'>
        <div className='text-xs leading-4 font-normal text-zinc-400'>{relativeTimeText}</div>
        {/* <div className=''> - 100 +</div> */}
      </div>
    </div>
  )
}

interface StarRatingProps {
  rating: number
}

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.round(rating)

  const fullStar = <Star className='fill-yellow-500 stroke-yellow-500' size={18} />
  const emptyStar = <Star size={18} />

  return (
    <div className='flex gap-1.5'>
      {fullStars >= 1 ? fullStar : emptyStar}
      {fullStars >= 2 ? fullStar : emptyStar}
      {fullStars >= 3 ? fullStar : emptyStar}
      {fullStars >= 4 ? fullStar : emptyStar}
      {fullStars >= 5 ? fullStar : emptyStar}
    </div>
  )
}
