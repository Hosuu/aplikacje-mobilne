"use server"

interface AddCafeResult {
  success: boolean
  criticalError: boolean
  message: string
}

export async function AddCafe(currentState: any, formData: FormData): Promise<AddCafeResult | undefined> {
  const gPlaceId = formData.get("gPlaceId")
  const name = formData.get("name")
  const tags = formData.get("tags")
  const desc = formData.get("desc")

  console.log(gPlaceId, name, tags, desc)

  if (gPlaceId === null || name === null) {
    return {
      success: false,
      criticalError: true,
      message: "Wystąpił błąd krytyczny!",
    }
  }

  if ((desc as string).search(/brzydkie slowa/) >= 0) {
    return {
      success: false,
      criticalError: false,
      message: "Opis zawiera nieodpowiednie słownictwo",
    }
  }

  // TODO SAVE CAFE TO DB

  return {
    success: true,
    criticalError: false,
    message: "Pomyslnie dodano kawiarnie!",
  }
}
