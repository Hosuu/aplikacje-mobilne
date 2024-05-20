"use client"

import { AddCafeReview } from "@/app/app/cafe/[cafeId]/addReview/actions"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import FormInput from "./FormInput"
import FormTextarea from "./FormTextarea"

interface GooglePlace {
  name: string
  place_id: string
  formatted_address: string
}

interface AddReviewFormProps {
  place_id: string
  name: string
}

export const AddCafeReviewForm: FC<AddReviewFormProps> = ({ place_id, name }) => {
  const router = useRouter()
  const [result, dispatch] = useFormState(AddCafeReview, undefined)

  useEffect(() => {
    if (result?.success) window.setTimeout(() => {router.back()}, 500) //prettier-ignore
  }, [result, router, place_id])

  return (
    <div className='w-full flex-1 rounded-lg border p-6 pb-4 pt-8 bg-zinc-950 border-zinc-800'>
      <div className='mb-3 text-2xl font-bold'>Dodaj Opinię</div>
      <form action={dispatch} className='flex flex-col gap-2'>
        <input type='hidden' name='gPlaceId' value={place_id} />
        <FormInput type='text' name='' disabled defaultValue={name} label='Nazwa' />
        <FormInput type='number' name='rating' min={0} max={5} defaultValue={"5"} label='Ocena' />
        <FormTextarea name='desc' label='Opinia' placeholder='Wyraź swoją opinię...' />
        <AddCafeReviewButton disabled={!!result?.success} />
        <p className={`text-sm text-center ${result?.success ? "text-green-500" : "text-red-500"}`}>
          {result?.message}
        </p>
      </form>
    </div>
  )
}

const AddCafeReviewButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={disabled || pending}
      className='my-4 flex h-10 w-full flex-row items-center justify-center gap-2 rounded-md  p-2 text-sm font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200'>
      {pending ? <LoaderCircle className='animate-spin' strokeWidth={2} /> : <p>Dodaj</p>}
    </button>
  )
}
