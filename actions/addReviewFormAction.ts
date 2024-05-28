"use server"

import { auth } from "@/auth"
import FieldStateBuilder, { type FieldStateMap } from "@/lib/FieldStateBuilder"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import Review from "@/models/Review"
import User from "@/models/User"

interface AddReviewFormResponse extends FieldStateMap {}

const profinityRegex = /brzydko/

export async function addReviewFormAction(currentState: any, formData: FormData): Promise<AddReviewFormResponse> {
  const formState = new FieldStateBuilder()

  try {
    const cafeId = formData.get("gPlaceId")
    const rating = formData.get("rating")
    const desc = formData.get("desc")

    if (rating === null) formState.setFieldState("rating", "ERROR", "Pole wymagane!")
    else if (Number(rating) < 0) formState.setFieldState("rating", "ERROR", "Minimalna ocena to: 0")
    else if (Number(rating) > 5) formState.setFieldState("rating", "ERROR", "Maksymalna ocena to: 5")

    if (desc === null) formState.setFieldState("desc", "ERROR", "Pole wymagane!")
    else if (String(desc).match(profinityRegex))
      formState.setFieldState("desc", "ERROR", "Opinia zawiera niestosowne słownictwo!")

    if (formState.hasAnyErrorFields()) throw new Error("Form contains error field")

    const sesion = await auth()
    if (sesion === null || sesion.user === undefined)
      throw formState.setFinalResult("ERROR", "Wystąpił błąd podczas weryfikacji sesji!", true)

    await connectToDB()
    const user = await User.findById(sesion.user.id)
    if (user == null) throw formState.setFinalResult("ERROR", "Wystąpił błąd podczas autentykacji!", true)

    const cafe = await Cafe.findById(cafeId)
    if (cafe == null) throw formState.setFieldState("name", "ERROR", "Podana kawiarnia nie istnieje w bazie!")

    // CONSIDER USING TRANSACTION IN CASE SOME OPERATION FAIL
    const review = new Review({ userId: user?.id, cafeId: cafeId, text: desc, rating })
    await review.save()

    const prevUserReviewAmount = user.reviews.length
    const totalUserRating = user.avgRating * prevUserReviewAmount
    user.reviews.push(review.id)
    user.avgRating = (totalUserRating + review.rating) / (prevUserReviewAmount + 1)
    await user.save()

    const prevCafeReviewAmount = cafe.reviews.length
    const totalCafeRating = cafe.rating * prevCafeReviewAmount
    cafe.reviews.push(review.id)
    cafe.rating = (totalCafeRating + review.rating) / (prevCafeReviewAmount + 1)
    await cafe.save()

    formState.setFinalResult("SUCCESS", "Pomyślnie dodano recenzję!", true)
  } catch (error) {
    console.error(error)
  }

  return formState.jsonObject
}
