import User from "@/models/User"
import { connectToDB } from "@/utils/dbConnect"

export async function GET() {
  connectToDB()
  const data = await User.find()
  return new Response(JSON.stringify(data))
}

export async function POST(req: Request) {
  connectToDB()
  const requestData = await req.json()
  const user = new User(requestData)
  user.save()
  return new Response("ok")
}
