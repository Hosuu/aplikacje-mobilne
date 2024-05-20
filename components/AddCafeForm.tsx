"use client"

import { AddCafe } from "@/app/app/cafe/new/actions"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC, useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import FormInput from "./FormInput"
import FormTextarea from "./FormTextarea"
import { TagSelect } from "./TagSelect"

interface GooglePlace {
  name: string
  place_id: string
  formatted_address: string
}

export default function AddCafeForm() {
  //#region Pre form state logic
  const [placeInputValue, setPlaceInputValue] = useState<string>("")
  const [completions, setCompletions] = useState<GooglePlace[]>([])
  const deboundeTimeout = useRef<number>(-1)
  const getCompletions = (input: string) => {
    if (input.length < 3) {
      setCompletions([])
      return
    }
    window.clearTimeout(deboundeTimeout.current)
    deboundeTimeout.current = window.setTimeout(async () => {
      const response = await fetch(`/api/cafe/completion?query=${input}`)
      const data = (await response.json()) as GooglePlace[]
      setCompletions(data.map(({ name, place_id, formatted_address }) => ({ name, place_id, formatted_address })))
    }, 500)
  }
  //#endregion

  const router = useRouter()
  const [googlePlace, setGooglePlace] = useState<GooglePlace | null>(null)
  const [result, dispatch] = useFormState(AddCafe, undefined)

  useEffect(() => {
    if (result?.criticalError) window.setTimeout(() => {setGooglePlace(null)}, 500) //prettier-ignore
    if (result?.success) window.setTimeout(() => {router.replace(`/app/cafe/${googlePlace?.place_id}`)}, 500) //prettier-ignore
  }, [result, router, googlePlace])

  //Pre form state render
  if (googlePlace === null) {
    return (
      <div className='w-full flex-1 rounded-lg border p-6 pt-8 shadow-m bg-zinc-950 border-zinc-800'>
        <div className='mb-3 text-2xl font-bold'>Dodaj kawiarnie</div>
        <div className='flex flex-col'>
          <label className='mb-3 mt-5 block text-xs font-medium text-zinc-400' htmlFor='preName'>
            Nazwa
          </label>
          <input
            className={`peer block w-full ${
              completions.length > 0 ? "rounded-t-md" : "rounded-md "
            } border px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 border-zinc-800 bg-zinc-950 disabled:cursor-not-allowed`}
            name='preName'
            autoComplete='off'
            placeholder='Wprowadź nazwę kawiarni'
            value={placeInputValue}
            onChange={(e) => {
              getCompletions(e.target.value)
              setPlaceInputValue(e.target.value)
            }}
          />
        </div>

        {completions.length > 0 && (
          <div className='rounded-b-lg overflow-hidden border border-t-0 border-zinc-800'>
            {completions.map((c, i) => (
              <div
                key={i}
                className='bg-zinc-900/75 hover:bg-zinc-950 p-2  cursor-pointer border-t first:border-0 border-zinc-800'
                onClick={() => setGooglePlace(c)}>
                <div className='text-zinc-100 text-base leading-6 font-medium text-nowrap text-ellipsis overflow-hidden'>
                  {c.name}
                </div>
                <div className='text-zinc-500 text-xs leading-5 font-normal'>{c.formatted_address}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='w-full flex-1 rounded-lg border p-6 pb-4 pt-8 bg-zinc-950 border-zinc-800'>
      <div className='mb-3 text-2xl font-bold'>Dodaj kawiarnie</div>
      <form action={dispatch} className='flex flex-col gap-2'>
        <input type='hidden' name='gPlaceId' value={googlePlace.place_id} />
        <input type='hidden' name='name' value={googlePlace.name} />
        <FormInput type='text' name='' disabled defaultValue={googlePlace.name} label='Nazwa' />
        <FormInput type='text' name='' disabled defaultValue={googlePlace.formatted_address} label='Adres' />
        {/* <FormInput type='text' name='tags' label='Tagi' placeholder='Zabytkowa, koty, tania...' /> */}
        <TagSelect />
        <FormTextarea name='desc' label='Opis' placeholder='Wspaniała kawiarnia...' />
        <AddCafeButton disabled={!!result?.success} />
        <p className={`text-sm text-center ${result?.success ? "text-green-500" : "text-red-500"}`}>
          {result?.message}
        </p>
      </form>
    </div>
  )
}

const AddCafeButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={disabled || pending}
      className='my-4 flex h-10 w-full flex-row items-center justify-center gap-2 rounded-md  p-2 text-sm font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200'>
      {pending ? <LoaderCircle className='animate-spin' strokeWidth={2} /> : <p>Dodaj</p>}
    </button>
  )
}
