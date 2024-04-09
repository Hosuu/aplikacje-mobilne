import User from "@/models/User"
import { connectToDB } from "@/utils/dbConnect"

export async function GET() {
  await connectToDB()
  const users = await User.find().sort({ points: "desc" })
  const parsedRanking = users.map((u, index) => ({ rank: index + 1, points: u.points, name: u.name, id: u._id }))
  return new Response(JSON.stringify(parsedRanking))
}
