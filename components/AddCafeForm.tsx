"use client"

import { AddCafe } from "@/app/app/cafe/new/actions"
import { LoaderCircle } from "lucide-react"
import { FC, useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import AuthFormInput from "./auth/AuthFormInput"

interface GooglePlace {
  name: string
  place_id: string
}

export default function AddCafeForm() {
  //#region Pre form state logic
  const [placeInputValue, setPlaceInputValue] = useState<string>("")
  const [completions, setCompletions] = useState<GooglePlace[]>([])
  const deboundeTimeout = useRef<number>(-1)
  const getCompletions = (input: string) => {
    window.clearTimeout(deboundeTimeout.current)
    deboundeTimeout.current = window.setTimeout(async () => {
      const response = await fetch(`/api/cafe/completion?query=${input}`)
      const data = (await response.json()) as GooglePlace[]
      setCompletions(data.map(({ name, place_id }) => ({ name, place_id })))
    }, 500)
  }
  //#endregion

  const [googlePlace, setGooglePlace] = useState<GooglePlace | null>(null)
  const [result, dispatch] = useFormState(AddCafe, undefined)

  useEffect(() => {}, [result])

  //Pre form state render
  if (googlePlace === null) {
    return (
      <div>
        <input
          type='text'
          className='text-black'
          value={placeInputValue}
          onChange={(e) => {
            getCompletions(e.target.value)
            setPlaceInputValue(e.target.value)
          }}
        />
        {completions.map((c, i) => (
          <div key={i} className='bg-zinc-900 p-2 rounded-lg cursor-pointer' onClick={() => setGooglePlace(c)}>
            {c.name} <br /> {c.place_id}
          </div>
        ))}
      </div>
    )
  }

  return (
    <form action={dispatch} className='flex flex-col items-center gap-4 space-y-3'>
      <input type='hidden' name='gPlaceId' value={googlePlace.place_id} />
      <input type='hidden' name='name' value={googlePlace.name} />
      <AuthFormInput type='text' name='' disabled required defaultValue={googlePlace.name} label='Nazwa' />
      <AuthFormInput type='text' name='tags' label='Tagi' placeholder='Wprowadź Tagi' />
      Opis xD
      <textarea name='desc' id='' className='text-black'></textarea>
      <AddCafeButton />
      <p className={`text-sm text-center ${result?.success ? "text-green-500" : "text-red-500"}`}>{result?.message}</p>
    </form>
  )
}

const AddCafeButton: FC = () => {
  const { pending } = useFormStatus()
  return (
    <button className='my-4 flex h-10 w-full flex-row items-center justify-center gap-2 rounded-md bg-zinc-900 p-2 text-sm font-bold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'>
      {pending ? <LoaderCircle className='animate-spin' strokeWidth={2} /> : <p>Dodaj</p>}
    </button>
  )
}
