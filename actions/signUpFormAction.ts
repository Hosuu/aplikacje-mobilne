"use server"

import FieldStateBuilder, { type FieldStateMap } from "@/lib/FieldStateBuilder"
import { connectToDB } from "@/lib/dbConnect"
import User from "@/models/User"

interface signUpFormResponse extends FieldStateMap {}

export async function signUpFormAction(currentState: any, formData: FormData): Promise<signUpFormResponse> {
  const formState = new FieldStateBuilder()

  try {
    const email = formData.get("email")
    const password = formData.get("password")
    const username = formData.get("username")

    await connectToDB()

    if (typeof email != "string") throw formState.setFieldState("email", "ERROR", "Niepoprawny adres e-mail")
    if (await User.findOne({ email }).lean())
      throw formState.setFieldState("email", "ERROR", "Użytkownik o podanym adresie e-mail już istnieje")

    if (typeof username != "string") throw formState.setFieldState("username", "ERROR", "Niepoprawna nazwa użytkownika")
    if (await User.findOne({ username }).lean())
      throw formState.setFieldState("username", "ERROR", "Użytkownik o podanej nazwie juz istnieje")

    const user = new User({ username, email, password })
    await user.save()
    formState.setFinalResult("SUCCESS", "Pomyślnie utworzono użytkownika!", true)
  } catch (e) {
    console.error(e)
  }

  return formState.jsonObject
}
