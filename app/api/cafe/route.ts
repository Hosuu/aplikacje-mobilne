import { auth } from "@/auth"
import { Tag as TagType } from "@/components/TagSelect"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import Tag from "@/models/Tag"

export interface CafeGetResponse {
  _id: string
  name: string
  address: string
  rating: number
  tags: TagType[]
  latitude: number
  longitude: number
}

export const GET = auth(async (req) => {
  if (req.auth === null) return new Response("Not authorized", { status: 403 })

  await connectToDB()
  Tag //Make sure model is initalized
  const cafes = await Cafe.find()
    .populate("tags", ["-_id", "name", "rainbow"])
    .select(["_id", "name", "rating", "tags", "latitude", "longitude", "address"])
    .lean()
  return new Response(JSON.stringify(cafes))
})
