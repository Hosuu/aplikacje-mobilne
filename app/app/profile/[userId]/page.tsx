import { InfoLabel } from "@/components/InfoLabel"
import { InfoRow } from "@/components/InfoRow"
import { connectToDB } from "@/lib/dbConnect"
import Cafe, { ICafeSchema } from "@/models/Cafe"
import User from "@/models/User"
import Image from "next/image"

interface pageProps {
  params: { userId: string }
}

export default async function Page({ params }: pageProps) {
  await connectToDB()
  const user = await User.findById(params.userId)
  if (user === null) return <div> USER NOT FOUND</div>

  Cafe
  const { visits } = (await User.findById(params.userId)
    .select(["visits"])
    .populate("visits.cafe", ["name"])
    .lean()) as {
      visits: { cafe: ICafeSchema; timeStamp: number; _id: string }[]
    }

  return (
    <div className='flex flex-col gap-4 flex-grow'>
      {/* ICON */}
      <div className='w-32 h-32 mt-8 rounded-full border-[3px] border-zinc-400 overflow-hidden self-center flex-shrink-0'>
        <Image
          src='https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288870.jpg'
          alt='User profile image'
          width={128}
          height={128}
        />
      </div>

      {/* USERNAME */}
      <div className='text-3xl leading-10 font-extrabold self-center'>{user?.username}</div>

      {/* USER INFO */}
      <div className='w-full flex-grow p-4 flex flex-col gap-8 rounded-t-2xl bg-zinc-950'>
        <div>
          <InfoLabel label='Ranking 🥇' linkText='Zobacz ranking' url='/app/ranking' />
          <InfoRow label='Pozycja w rankingu' value={"#" + (await user.rank())} />
          <InfoRow label='Ilość punktów' value={user.points} />
        </div>
        <div>
          <InfoLabel label='Recenzje 📋' linkText='Zobacz wszystkie' url={`/app/profile/${user._id}/reviews`} />
          <InfoRow label='Ilość recenzji' value={user.reviews.length} />
          <InfoRow label='średnia ocena' value={user.avgRating.toFixed(1)} />
        </div>
        <div>
          <InfoLabel label='Statystyki 📋' />
          <InfoRow label='Ilość odwiedzonych kawiarni' value={visits.length} />
        </div>
        {visits.length > 0 && (
          <div>
            <InfoLabel label='Wizyty 📅' />
            {visits.map((visit) => {
              const dateString = new Date(visit.timeStamp).toLocaleDateString("pl-PL")
              return <InfoRow key={visit._id} label={visit.cafe.name} value={dateString} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
