"use client"

import { FC } from "react"
import { useFormState } from "react-dom"
import { testFormAction } from "../../actions/testAction"
import { FormWrapper } from "../form/elements/FormWrapper"
import { Input } from "../form/elements/Input"
import { SubmitButton } from "../form/elements/SubmitButton"

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
