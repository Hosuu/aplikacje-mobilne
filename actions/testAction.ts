"use server"

import FieldStateBuilder, { type FieldStateMap } from "@/lib/FieldStateBuilder"

interface TestFormResponse extends FieldStateMap {}

export async function testFormAction(currentState: any, formData: FormData): Promise<TestFormResponse> {
  await new Promise((res) => setTimeout(res, 500))

  const state = new FieldStateBuilder()
  state.setFieldState("something", "ERROR", "Some error message!")
  state.setFinalResult("DEFAULT", "Chuj", false)

  return state.jsonObject
}
