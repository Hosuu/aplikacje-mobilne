"use server"

import User from "@/models/User"
import { z } from "zod"
import { getUser } from "../login/actions"

export async function createUser(username: string, email: string, password: string) {
  const existingUser = await getUser(email)

  if (existingUser) {
    return {
      success: false,
      message: "Użytkownik o poadnym adresie juz istnieje!",
    }
  } else {
    const user = new User({ username, email, password })
    await user.save()

    return {
      success: true,
      message: "Pomyślnie utworzono użytkownika!",
      email: "asd@asd.com",
    }
  }
}

interface SignupRessult {
  success: boolean
  email?: string
  message: string
}

export async function signup(currentState: any, formData: FormData): Promise<SignupRessult | undefined> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const username = formData.get("username") as string

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      username: z.string(),
    })
    .safeParse({
      email,
      password,
      username,
    })

  if (parsedCredentials.success) {
    const result = await createUser(username, email, password)
    return { ...result, email }
  } else {
    return {
      success: false,
      message: "Wystąpił błąd podczas rejestracji",
    }
  }
}
