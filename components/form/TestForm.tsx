"use client"

import { FC } from "react"
import { useFormState } from "react-dom"
import { FormWrapper } from "./FormWrapper"
import { Input } from "./Input"
import { SubmitButton } from "./SubmitButton"
import { testFormAction } from "./testAction"

interface TestFormProps {}

export const TestForm: FC<TestFormProps> = ({}) => {
  const [result, dispatch] = useFormState(testFormAction, undefined)
  return (
    <FormWrapper label='Test' result={result} action={dispatch}>
      <Input id='name' name='name' label='name' value='xDDDD' />
      <Input id='something' name='something' label='something' placeholder='xD' />
      <Input id='cosik' name='cosik' label='cosik' />
      <SubmitButton label='Wyslij' />
    </FormWrapper>
  )
}
