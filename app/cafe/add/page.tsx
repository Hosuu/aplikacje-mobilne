"use client"
import { Input } from "@/components/Input"
import { Textarea } from "@/components/Textarea"
import { useState } from "react"

export default function Page() {
  const [googlePlaceId, setGooglePlaceId] = useState("")
  const hasGooglePlaceId = () => googlePlaceId != ""

  return (
    <form className='max-w-sm mx-auto'>
      <h1 className='text-xl'>Dodaj swoją kawiarnie!</h1>
      <Input label='Nazwa kawiarni' name='cafeName' className='my-4' />
      <Textarea label='Opis kawiarni' name='cafeDescription' className='my-4' disabled={!hasGooglePlaceId()} />
      <input type='hidden' id='googlePlaceID' value={googlePlaceId} />

      {/* TODO: Tags? */}

      {/* SUBMIT */}
      <button
        type='submit'
        disabled={!hasGooglePlaceId()}
        className='text-white bg-blue-700  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center disabled:bg-blue-900 disabled:text-gray-400 disabled:cursor-not-allowed enabled:hover:bg-blue-800'>
        Dodaj
      </button>
    </form>
  )
}
