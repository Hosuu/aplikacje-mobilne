"use server"

import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"

interface AddCafeResult {
  success: boolean
  criticalError: boolean
  message: string
}

export async function AddCafe(currentState: any, formData: FormData): Promise<AddCafeResult | undefined> {
  const gPlaceId = formData.get("gPlaceId")
  const rawTags = (formData.get("tags") ?? "") as string
  const description = formData.get("desc")

  const tags = rawTags.length > 0 ? [...rawTags.split(",")] : []

  if (gPlaceId === null) {
    return {
      success: false,
      criticalError: true,
      message: "Wystąpił błąd krytyczny!",
    }
  }

  if ((description as string).search(/brzydkie slowa/) >= 0) {
    return {
      success: false,
      criticalError: false,
      message: "Opis zawiera nieodpowiednie słownictwo",
    }
  }

  await connectToDB()
  if (await Cafe.findById(gPlaceId as string)) {
    return {
      success: false,
      criticalError: true,
      message: "Podana kawiarnia jest juz zarejestrowana w naszej bazie!",
    }
  }

  try {
    const gMapsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${gPlaceId}&key=${process.env.GMAPS_API_KEY}&language=pl&fields=name,geometry`) //prettier-ignore
    const gMapsData = await gMapsResponse.json()
    if(gMapsData?.result?.geometry?.location == undefined || gMapsData?.result?.name == undefined) throw new Error("GoogleMaps API error") //prettier-ignore
    const name = gMapsData.result.name
    const latitude = gMapsData.result.geometry.location.lat
    const longitude = gMapsData.result.geometry.location.lng

    const cafe = new Cafe({
      _id: gPlaceId,
      name,
      tags,
      description,
      latitude,
      longitude,
    })
    cafe.save()
  } catch (e) {
    console.log(e)
    return {
      success: false,
      criticalError: false,
      message: "Error",
    }
  }

  return {
    success: true,
    criticalError: false,
    message: "Pomyslnie dodano kawiarnie!",
  }
}
