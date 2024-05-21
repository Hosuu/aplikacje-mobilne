import { auth } from "@/auth"
import { connectToDB } from "@/lib/dbConnect"
import Tag from "@/models/Tag"

export const GET = auth(async (req) => {
  if (req.auth === null) return new Response("Not authorized", { status: 403 })

  await connectToDB()
  const tags = await Tag.find().select(["_id", "name", "description", "rainbow"])

  return new Response(JSON.stringify(tags))
})
