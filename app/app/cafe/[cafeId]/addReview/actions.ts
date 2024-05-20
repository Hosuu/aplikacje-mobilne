"use server"

interface AddCafeReviewResult {
  success: boolean
  message: string
}

export async function AddCafeReview(currentState: any, formData: FormData): Promise<AddCafeReviewResult | undefined> {
  const gPlaceId = formData.get("gPlaceId")
  const name = formData.get("name")

  return {
    success: true,
    message: "Pomyslnie dodano opinię!",
  }
}
