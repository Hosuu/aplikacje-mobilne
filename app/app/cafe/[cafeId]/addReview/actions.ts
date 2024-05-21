"use server"

import { auth } from "@/auth"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import Review from "@/models/Review"
import User from "@/models/User"

interface AddCafeReviewResult {
  success: boolean
  message: string
}

export async function AddCafeReview(currentState: any, formData: FormData): Promise<AddCafeReviewResult | undefined> {
  const cafeId = formData.get("gPlaceId")
  const rating = formData.get("rating")
  const desc = formData.get("desc")

  try {
    if (cafeId == null || rating == null || desc == null) throw new Error("Wszystkie pola musza byc wypełnione")

    const sesion = await auth()
    if (sesion == null) throw new Error("Auth Error")
    if (sesion.user == null) throw new Error("Auth Error")

    await connectToDB()
    const user = await User.findById(sesion.user.id)
    if (user == null) throw new Error("DB Error")

    const cafe = await Cafe.findById(cafeId)
    if (cafe == null) throw new Error("DB Error")

    const review = new Review({ userId: user?.id, cafeId: cafeId, text: desc, rating })
    await review.save()

    //Add review ref to user document
    const prevUserReviewAmount = user.reviews.length
    const totalUserRating = user.avgRating * prevUserReviewAmount
    user.reviews.push(review.id)
    user.avgRating = (totalUserRating + review.rating) / (prevUserReviewAmount + 1)
    await user.save()

    //Add review ref to cafe document
    const prevCafeReviewAmount = cafe.reviews.length
    const totalCafeRating = cafe.rating * prevCafeReviewAmount
    cafe.reviews.push(review.id)
    cafe.rating = (totalCafeRating + review.rating) / (prevCafeReviewAmount + 1)
    await cafe.save()
    //
  } catch (e) {
    return {
      success: false,
      message: JSON.stringify(e),
    }
  }
  return {
    success: true,
    message: "Pomyslnie dodano opinię!",
  }
}
