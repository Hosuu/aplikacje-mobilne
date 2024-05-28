"use server"

import { signIn } from "@/auth"
import FieldStateBuilder, { type FieldStateMap } from "@/lib/FieldStateBuilder"
import { AuthError } from "next-auth"

interface signInFormResponse extends FieldStateMap {}

export async function signInFormAction(currentState: any, formData: FormData): Promise<signInFormResponse> {
  const formState = new FieldStateBuilder()

  try {
    const email = formData.get("email")
    const password = formData.get("password")

    console.log(email, password)

    await signIn("credentials", { email, password, redirect: false })
    formState.setFinalResult("SUCCESS", "Pomyślnie zalogowano!", true)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          formState.setFieldState("password", "ERROR", "Błędne hasło!")
          break

        default:
          formState.setFinalResult("ERROR", "Wystąpił błąd podczas logowania", false)
          break
      }
    } else formState.setFinalResult("ERROR", "Wystąpił błąd podczas logowania", false)
  }

  return formState.jsonObject
}
