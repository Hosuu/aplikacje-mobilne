"use server"

import { signIn } from "@/auth"
import { connectToDB } from "@/lib/dbConnect"
import User from "@/models/User"
import { AuthError } from "next-auth"
import { z } from "zod"

export async function getUser(email: string) {
  await connectToDB()
  const user = await User.findOne({ email: email })
  return user
}

interface AuthenticateRessult {
  success: boolean
  message: string
}

export async function signInAction(currentState: any, formData: FormData): Promise<AuthenticateRessult | undefined> {
  try {
    const email = formData.get("email")
    const password = formData.get("password")

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse({
        email,
        password,
      })

    if (parsedCredentials.success) {
      await signIn("credentials", { email, password, redirect: false })
      return {
        success: true,
        message: "Zalogowano pomyślnie",
      }
    } else {
      return {
        success: false,
        message: "Błędne hasło",
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Błędne hasłoo",
          }
        default:
          return {
            success: false,
            message: "Wystąpił błąd podczas logowania",
          }
      }
    }
  }
}
