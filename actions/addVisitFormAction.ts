"use server"

import { auth } from "@/auth"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import User from "@/models/User"

interface addVisitFormResponse {
  success: boolean
}

export async function addVisitFormAction(currentState: any, formData: FormData): Promise<addVisitFormResponse> {
  await new Promise((res) => setTimeout(res, 500))

  try {
    const sesion = await auth()
    if (sesion === null || sesion.user === undefined) return { success: false }

    const cafeId = formData.get("cafeId")
    if (typeof cafeId !== "string") return { success: false }

    await connectToDB()
    const cafe = await Cafe.findById(cafeId)
    if (cafe === null) return { success: false }

    const user = await User.findOne({ email: sesion.user.email! })
    if (user === null) return { success: false }

    const lastVisitDate = user.visits.length > 0 ? new Date(user.visits[user.visits.length - 1].timeStamp) : new Date(0)
    const currnetDate = new Date()

    if (lastVisitDate.getDate() === currnetDate.getDate())
      if (lastVisitDate.getMonth() === currnetDate.getMonth()) return { success: false }

    user.points += 5
    user.visits.push({ cafe: cafeId, timeStamp: Date.now() })
    user.save()
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}
