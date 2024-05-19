import { LucideIcon } from "lucide-react"
import { FC, ReactNode } from "react"

interface InfoRowProps {
  label: string
  value: string | number | ReactNode
  ValueIcon?: LucideIcon
}

export const InfoRow: FC<InfoRowProps> = ({ label, value, ValueIcon }) => {
  return (
    <div className='flex flex-row py-2 justify-between items-center border-b border-zinc-900 text-base leading-5 font-normal'>
      <div className='text-zinc-400'>{label}</div>
      <div className='text-zinc-100 flex items-center gap-1'>{value}</div>
    </div>
  )
}
