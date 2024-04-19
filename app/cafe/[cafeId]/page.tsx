import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import { RedirectType, redirect } from "next/navigation"

export default async function Page({ params }: { params: { cafeId: string } }) {
  await connectToDB()
  const queryCafeId = params.cafeId
  const cafes = await Cafe.findOne({ googleMapsPlaceID: queryCafeId })
  if (cafes === null) redirect("/cafe/unknown", RedirectType.replace)
  return <div>My CafeId: {params.cafeId}</div>
}
