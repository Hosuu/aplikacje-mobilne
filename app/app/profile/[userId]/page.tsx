import { InfoLabel } from "@/components/InfoLabel"
import { InfoRow } from "@/components/InfoRow"
import { connectToDB } from "@/lib/dbConnect"
import User from "@/models/User"
import Image from "next/image"

interface pageProps {
  params: { userId: string }
}

export default async function Page({ params }: pageProps) {
  await connectToDB()
  const user = await User.findById(params.userId)
  if (user === null) return <div> USER NOT FOUND</div>

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
          <InfoLabel label='Ranking 🥇' linkText='Zobacz ranking' url='/app/profile/ranking' />
          <InfoRow label='Pozycja w rankingu' value='#1' />
          <InfoRow label='Ilość punktów' value='5' />
        </div>
        <div>
          <InfoLabel label='Recenzje 📋' linkText='Zobacz wszystkie' url={`/app/profile/${user.id}/reviews`} />
          <InfoRow label='Ilość recenzji' value={user.reviews.length} />
          <InfoRow label='średnia ocena' value={user.avgRating} />
        </div>
        <div>
          <InfoLabel label='Statystyki 📋' />
          <InfoRow label='Ilość odwiedzonych kawiarni' value='Not yet implementd' />
        </div>
        <div>
          <InfoLabel label='Osiągnięcia 🏆' />
          <InfoRow label='test' value='21.05.2023' />
        </div>
      </div>
    </div>
  )
}
