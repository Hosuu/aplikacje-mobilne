import { auth } from "@/auth"
import { CafeReviewBody } from "@/components/CafeReviewBody"
import { InfoLabel } from "@/components/InfoLabel"
import { InfoRow } from "@/components/InfoRow"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import { Compass, Globe, LucideIcon, Phone, Star } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FC } from "react"

interface pageProps {
  params: { cafeID: string }
}

export default async function Page({ params }: pageProps) {
  const session = await auth()
  if (session?.user == undefined) {
    redirect("/")
  }

  await connectToDB()
  const cafe = await Cafe.findById(params.cafeID)
  // if (cafe === null) return <div>CAFFE NOT FOUND</div>

  return (
    <>
      {/* CAFE LOGO */}
      <div className='w-32 h-32 rounded-full border-[3px] border-zinc-400 overflow-hidden self-center flex-shrink-0'>
        <img
          src='https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg'
          alt='User profile image'
          width={128}
          height={128}
        />
      </div>

      {/* CAFE NAME */}
      <div className='text-3xl leading-10 font-extrabold self-center'>Fauget catering</div>

      {/* USER INFO */}
      <div className='w-full flex-grow p-4 flex flex-col gap-8 rounded-t-2xl bg-zinc-950'>
        {/* Cafe Buttons */}
        <div className='flex pt-4 gap-4 justify-between'>
          <CafeInfoButton Icon={Phone} href='tel:+48987654321' label='Zadzwoń' />
          <CafeInfoButton Icon={Compass} href='tel:+48987654321' label='Dojazd' />
          <CafeInfoButton Icon={Globe} href='tel:+48987654321' label='Strona' />
        </div>
        {/* CAFE DETAILS */}
        <div>
          <InfoLabel label='Informacje' />
          <InfoRow
            label='Ocena'
            value={
              <>
                4.2
                <Star className='fill-yellow-500 stroke-yellow-500' />
              </>
            }
          />
          <InfoRow label='Godziny otwarcia' value='09:00 - 21:00' />
          <InfoRow label='Adres' value='Banana słodkiego 42/2' />
        </div>
        <div className='flex flex-col gap-3'>
          <InfoLabel label='Recenzje' linkText='Dodaj recenzję' url={"asd" + "/addReview"} />
          <CafeReview />
          <CafeReview />
          <CafeReview />
        </div>
      </div>
    </>
  )
}

interface CafeInfoButtonProps {
  Icon: LucideIcon
  label: string
  href: string
}

const CafeInfoButton: FC<CafeInfoButtonProps> = ({ Icon, label, href }) => {
  return (
    <Link
      href={href}
      className='flex flex-col p-2 items-center gap-1 flex-grow max-w-32 rounded-2xl bg-zinc-900/50 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]'>
      <Icon />
      {label}
    </Link>
  )
}

interface CafeReviewProps {}

const CafeReview: FC<CafeReviewProps> = () => {
  return (
    <div className='flex p-2 flex-col gap-2.5 rounded-lg bg-zinc-900/50'>
      <div className='flex justify-between items-center'>
        <div className='text-base leading-7 font-semibold text-zinc-100'>Username</div>
        <StarRating rating={3} />
      </div>
      <CafeReviewBody />
      <div className='flex justify-between items-center'>
        <div className='text-xs leading-4 font-normal text-zinc-400'>05.05.2025</div>
        <div className=''> - 100 +</div>
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
