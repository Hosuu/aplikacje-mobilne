import { InfoLabel } from "@/components/InfoLabel"
import { InfoRow } from "@/components/InfoRow"
import { connectToDB } from "@/lib/dbConnect"
import User from "@/models/User"

interface pageProps {
  params: { userId: string }
}

export default async function Page({ params }: pageProps) {
  await connectToDB()
  const user = await User.findById(params.userId)
  if (user === null) return <div> USER NOT FOUND</div>

  return (
    <>
      {/* ICON */}
      <div className='w-32 h-32 rounded-full border-[3px] border-zinc-400 overflow-hidden self-center flex-shrink-0'>
        <img
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
          <InfoRow label='Ilość punktów' value='42069' />
        </div>
        <div>
          <InfoLabel label='Statystyki 📋' />
          <InfoRow label='Ilość recenzji' value='420' />
          <InfoRow label='Ilość odwiedzonych kawiarni' value='69' />
        </div>
        <div>
          <InfoLabel label='Osiągnięcia 🏆' />
          <InfoRow label='Achivement name' value='10.03.2023' />
        </div>
      </div>
    </>
  )
}
