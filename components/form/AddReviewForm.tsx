"use client"

import { addReviewFormAction } from "@/actions/addReviewFormAction"
import { useRouter } from "next/navigation"
import { useEffect, type FC } from "react"
import { useFormState } from "react-dom"
import { FormWrapper } from "./elements/FormWrapper"
import { Input } from "./elements/Input"
import { SubmitButton } from "./elements/SubmitButton"
import { TextArea } from "./elements/TextArea"

interface AddReviewFormProps {
  place_id: string
  name: string
}

export const AddReviewForm: FC<AddReviewFormProps> = ({ place_id, name }) => {
  const router = useRouter()
  const [result, dispatch] = useFormState(addReviewFormAction, undefined)

  useEffect(() => {
    if (result && result.finalResult?.settled) window.setTimeout(() => router.back(), 500)
  }, [result, router])

  return (
    <FormWrapper label='Dodaj recenzje' result={result} action={dispatch} className='w-full mt-3'>
      <input type='hidden' name='gPlaceId' value={place_id} />
      <Input label='Nazwa' name='name' id='name' disabled defaultValue={name} />
      <Input label='Ocena' type='number' name='rating' id='rating' defaultValue={5} /*min={0} max={5}*/ required />
      <TextArea label='Opinia' name='desc' id='desc' required placeholder='Wyraź swoją opinię...' />
      <SubmitButton label='Dodaj' />
    </FormWrapper>
  )
}
