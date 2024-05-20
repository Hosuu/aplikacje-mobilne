import { CafeList } from "@/components/CafeList"
import { CalendarCheck, ChevronRight } from "lucide-react"
import Link from "next/link"

interface pageProps {}

export default async function Page({}: pageProps) {
  return (
    <>
      <CafeList />
      <Link
        href={"/app/visit"}
        className='flex p-4 pb-6 justify-between items-center border-t border-zinc-500 bg-zinc-950 pb-safe-main-view'>
        <div className='flex gap-2'>
          <CalendarCheck size={24} strokeWidth={1.5} />
          <div className='text-zinc-100 text-base leading-6 font-medium'>Dodaj wizytę</div>
        </div>
        <ChevronRight size={24} />
      </Link>
    </>
  )
}
