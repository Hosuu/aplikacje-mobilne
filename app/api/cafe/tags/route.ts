import { connectToDB } from "@/lib/dbConnect"
import Tag from "@/models/Tag"

export async function GET() {
  await connectToDB()
  const tags = await Tag.find()
  return new Response(JSON.stringify(tags))
}
