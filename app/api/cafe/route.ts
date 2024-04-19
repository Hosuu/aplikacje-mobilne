import { connectToDB } from "@/lib/dbConnect"
import Cafe, { CafeSchema } from "@/models/Cafe"

export async function GET() {
  await connectToDB()
  const cafes = await Cafe.find()
  return new Response(JSON.stringify(cafes))
}

export async function POST(req: Request) {
  await connectToDB()
  const props = await req.json()

  //validate required paths
  const missingFields: string[] = []
  for (const field of CafeSchema.requiredPaths()) {
    if (!Object.hasOwn(props, field)) missingFields.push(field)
  }

  if (missingFields.length > 0)
    return new Response(`Error: MISSING_FIELDS\n[${missingFields.map((c) => `'${c}'`).join()}]`, { status: 400 })

  //Validate GoogleMapsPlaceId

  const cafe = new Cafe({ ...props })
  try {
    await cafe.save()
  } catch (e) {
    console.log(e)
    return new Response("Error while trying to save!", { status: 400 })
  }

  return new Response(`Succes! save cafe named: ${props.name}`, { status: 200 })
}
