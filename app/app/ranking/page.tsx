import { connectToDB } from "@/lib/dbConnect"
import User from "@/models/User"
import Link from "next/link"
import { type FC } from "react"

interface pageProps {}

export default async function Page({}: pageProps) {
  await connectToDB()
  const users = await User.find().sort({ points: "desc" })
  const parsedRanking: RankingUserEntry[] = users.map((u, index) => ({
    rank: index + 1,
    points: u.points,
    username: u.username,
    id: u._id as unknown as string,
  }))

  return (
    <div className={`flex flex-col flex-grow gap-2`}>
      {parsedRanking.map((entry) => (
        <RankingUserEntry key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

interface RankingUserEntry {
  rank: number
  points: number
  username: string
  id: string
}

interface RankingUserEntryProps {
  entry: RankingUserEntry
}

const RankingUserEntry: FC<RankingUserEntryProps> = ({ entry: { id, points, rank, username } }) => {
  return (
    <Link href={`/app/profile/${id}`} className='flex p-4 gap-4 bg-zinc-950 text-zinc-100 bg-gradient-to-r '>
      <div className='text-lg leading-6 font-normal min-w-12'>
        #{rank}
        {rank == 1 && "🥇"}
        {rank == 2 && "🥈"}
        {rank == 3 && "🥉"}
      </div>
      <div className='text-lg leading-6 font-medium text-ellipsis text-nowrap overflow-hidden flex-grow'>
        {username}
      </div>
      <div className='text-zinc-400'>{points}</div>
    </Link>
  )
}
