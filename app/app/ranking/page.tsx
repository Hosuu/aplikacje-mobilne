import { connectToDB } from "@/lib/dbConnect"
import User from "@/models/User"
import Link from "next/link"
import { type FC } from "react"

interface pageProps {}

export const dynamic = "force-dynamic"

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
    <div className='flex flex-col gap-4 p-4 bg-zinc-950 flex-grow'>
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

function getGradientStartFromRank(rank: number): string {
  switch (rank) {
    case 1:
      return "yellow-500"
    case 2:
      return "gray-500"
    case 3:
      return "yellow-900"
    default:
      return "zinc-800"
  }
}

const RankingUserEntry: FC<RankingUserEntryProps> = ({ entry: { id, points, rank, username } }) => {
  const graidentStartColor = getGradientStartFromRank(rank)
  return (
    <Link
      href={`/app/profile/${id}`}
      className={`flex p-2 py-3 gap-2.5 rounded-lg text-zinc-100 bg-gradient-to-r from-${graidentStartColor} to-zinc-900/50 to-15%`}>
      <div className='text-lg leading-6 font-normal min-w-14'>
        #{rank}
        {rank == 1 && " 🥇"}
        {rank == 2 && " 🥈"}
        {rank == 3 && " 🥉"}
      </div>
      <div className='text-lg leading-6 font-medium text-ellipsis text-nowrap overflow-hidden flex-grow'>
        {username}
      </div>
      <div className='text-zinc-400'>{points}</div>
    </Link>
  )
}
