import { auth } from "@/auth"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import Tag from "@/models/Tag"

export interface CafeGetResponse {
  name: string
  rating: number
  tags: { name: string }[]
  latitude: number
  longitude: number
  googleMapsPlaceID: string
}

export const GET = auth(async (req) => {
  if (req.auth === null) return new Response("Not authorized", { status: 403 })

  await connectToDB()
  const cafes = await Cafe.find()
    .populate(Tag.collection.name, ["-_id", "name"])
    .select(["-_id", "name", "rating", "tags", "latitude", "longitude", "googleMapsPlaceID"])
  return new Response(JSON.stringify(cafes))
})

// export async function POST(req: Request) {
//   await connectToDB()
//   const props = await req.json()

//   //validate required paths
//   const missingFields: string[] = []
//   for (const field of CafeSchema.requiredPaths()) {
//     if (!Object.hasOwn(props, field)) missingFields.push(field)
//   }

//   if (missingFields.length > 0)
//     return new Response(`Error: MISSING_FIELDS\n[${missingFields.map((c) => `'${c}'`).join()}]`, { status: 400 })

//   //Validate GoogleMapsPlaceId

//   const cafe = new Cafe({ ...props })
//   try {
//     await cafe.save()
//   } catch (e) {
//     console.log(e)
//     return new Response("Error while trying to save!", { status: 400 })
//   }

//   return new Response(`Succes! save cafe named: ${props.name}`, { status: 200 })
// }
