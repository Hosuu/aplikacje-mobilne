import Link from "next/link"
import { FC } from "react"

interface InfoLabelProps {
  label: string
  linkText?: string
  url?: string
}

export const InfoLabel: FC<InfoLabelProps> = ({ label, url, linkText }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='text-zinc-100 text-2xl leading-8 font-bold'>{label}</div>
      {linkText && (
        <Link href={url!} className='text-sky-600 text-base leading-5 font-normal'>
          {linkText}
        </Link>
      )}
    </div>
  )
}
