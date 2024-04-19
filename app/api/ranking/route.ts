import { connectToDB } from "@/lib/dbConnect"
import User from "@/models/User"

export async function GET() {
  await connectToDB()
  const users = await User.find().sort({ points: "desc" })
  const parsedRanking = users.map((u, index) => ({
    rank: index + 1,
    points: u.points,
    username: u.username,
    id: u._id,
  }))
  return new Response(JSON.stringify(parsedRanking))
}
