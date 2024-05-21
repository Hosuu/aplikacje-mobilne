import { CafeReviewBody } from "@/components/CafeReviewBody"
import { InfoLabel } from "@/components/InfoLabel"
import { InfoRow } from "@/components/InfoRow"
import { OpeningHours } from "@/components/OpeningHours"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import { Compass, Globe, LucideIcon, Phone, Star } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

interface pageProps {
  params: { cafeId: string }
}

export default async function Page({ params }: pageProps) {
  await connectToDB()
  const cafe = await Cafe.findOne({ googleMapsPlaceID: params.cafeId })
  if (cafe === null) return <div>CAFE NOT FOUND</div>

  const gMapsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${params.cafeId}&key=${process.env.GMAPS_API_KEY}&language=pl&fields=name,international_phone_number,opening_hours,website,url,serves_beer,price_level,reviews,formatted_address`, {
    // cache: "force-cache",
  }) //prettier-ignore
  const gMapsDetails = await gMapsResponse.json()

  const openingHours = gMapsDetails.result?.opening_hours.weekday_text
  const address = gMapsDetails.result?.formatted_address
  const website = gMapsDetails.result?.website
  const phone = gMapsDetails.result?.international_phone_number
  const gMapUrl = gMapsDetails.result?.url
  const name = gMapsDetails.result?.name
  const reviews = gMapsDetails.result?.reviews ?? []
  const beer = gMapsDetails.result?.serves_beer

  return (
    <div className='flex flex-col gap-4'>
      {/* CAFE LOGO */}
      <div className='w-32 h-32 mt-8 rounded-full border-[3px] border-zinc-400 overflow-hidden self-center flex-shrink-0'>
        <img
          src='https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg'
          alt='User profile image'
          width={128}
          height={128}
        />
      </div>

      {/* CAFE NAME */}
      <div className='text-3xl leading-10 font-extrabold self-center'>{name}</div>

      {/* USER INFO */}
      <div className='w-full flex-grow p-4 flex flex-col gap-8 rounded-t-2xl bg-zinc-950'>
        {/* Cafe Buttons */}
        <div className='flex pt-4 gap-4 justify-around'>
          {phone && <CafeInfoButton Icon={Phone} href={`tel:${phone}`} label='Zadzwoń' />}
          {gMapUrl && <CafeInfoButton Icon={Compass} href={gMapUrl} label='Dojazd' />}
          {website && <CafeInfoButton Icon={Globe} href={website} label='Strona' />}
        </div>

        {/* CAFE DETAILS */}
        <div>
          <InfoLabel label='Informacje' />
          <InfoRow
            label='Ocena'
            value={
              <>
                {cafe.reviews.length > 0 ? `${cafe.rating}(${cafe.reviews.length})` : "Brak recenzji"}
                <Star className='fill-yellow-500 stroke-yellow-500' />
              </>
            }
          />
          {openingHours && <OpeningHours timeTable={openingHours} />}
          {address && <InfoRow label='Adres' value={address} />}
          <InfoRow label='Piwo 🍺' value={beer ? "Jest!" : "Nie ma :("} />
        </div>
        <div className='flex flex-col gap-3'>
          <InfoLabel label='Recenzje' linkText='Dodaj recenzję' url={params.cafeId + "/addReview"} />
          {reviews.map((r: any, i: number) => (
            <CafeReview
              rating={r.rating}
              author={r.author_name}
              time={r.time}
              text={r.text}
              key={i}
              relative_time_description={r.relative_time_description}
            />
          ))}
        </div>
      </div>
    </div>
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

interface CafeReviewProps {
  author: string
  text: string
  rating: number
  time: number
  relative_time_description: string
}

const CafeReview: FC<CafeReviewProps> = ({ author, text, rating, time, relative_time_description }) => {
  return (
    <div className='flex p-2 flex-col gap-2.5 rounded-lg bg-zinc-900/50'>
      <div className='flex justify-between items-center'>
        <div className='text-base leading-7 font-semibold text-zinc-100'>{author}</div>
        <StarRating rating={rating} />
      </div>
      <CafeReviewBody text={text} />
      <div className='flex justify-between items-center'>
        {/* <div className='text-xs leading-4 font-normal text-zinc-400'>{new Date(time).toLocaleDateString()}</div> */}
        <div className='text-xs leading-4 font-normal text-zinc-400'>{relative_time_description}</div>
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
