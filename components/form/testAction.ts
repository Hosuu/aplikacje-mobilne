"use server"

import FormResponseBuilder, { BaseFormResponse } from "@/lib/FormResponseBuilder"

interface TestFormResponse extends BaseFormResponse {}

export async function testFormAction(currentState: any, formData: FormData): Promise<TestFormResponse> {
  await new Promise((res) => setTimeout(res, 500))
  const response = new FormResponseBuilder()
  response.setFieldState("something", "ERROR", "Some error message!")
  return response.asPlain
}
