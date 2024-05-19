"use server"

interface AddCafeResult {
  success: boolean
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
      message: "Critical error",
    }
  }

  if ((desc as string).search(/brzydkie slowa/) >= 0) {
    return {
      success: false,
      message: "Grzeczniej szcylu",
    }
  }

  return {
    success: true,
    message: "Pomyslnie dodano kawiarnie!",
  }
}
