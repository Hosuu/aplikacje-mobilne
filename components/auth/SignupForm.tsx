"use client"

import { signup } from "@/app/auth/signup/actions"
import { LoaderCircle, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import FormInput from "../FormInput"

export default function SignupForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(signup, undefined)

  useEffect(() => {
    if (result && result.success)
      setTimeout(() => router.push(`/login${result.email ? "?email=" + result.email : ""}`), 1000)
  }, [result, router])

  return (
    <form action={dispatch} className='flex flex-col items-center gap-4 space-y-3'>
      <div className='w-full flex-1 rounded-lg border  px-6 pb-4 pt-8 shadow-md  md:w-96 bg-zinc-950 border-zinc-800'>
        <div className='mb-3 text-2xl font-bold flex gap-2'>
          <LogIn size={"1.3em"} strokeWidth={3} />
          Zarejestruj się
        </div>
        <FormInput
          type='text'
          name='username'
          required
          label='Nazwa użytkownika'
          placeholder='Wprowadź swoją nazwę użytkownika'
          disabled={result?.success}
        />
        <FormInput
          type='email'
          name='email'
          required
          label='Adres e-mail'
          placeholder='Wprowadź swój adres e-mail'
          disabled={result?.success}
        />
        <FormInput
          type='password'
          minLength={6}
          name='password'
          required
          label='Hasło'
          placeholder='Wprowadź hasło'
          disabled={result?.success}
        />
        <LoginButton disabled={!!result?.success} />
        <p className={`text-sm text-center ${result?.success ? "text-green-500" : "text-red-500"}`}></p>
      </div>
    </form>
  )
}

const LoginButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  const { pending } = useFormStatus()

  const icon = pending ? <LoaderCircle className='animate-spin' strokeWidth={2} /> : null
  const label = pending ? <p>Rejestracja...</p> : <p>Zarejestuj</p>

  return (
    <button
      disabled={disabled || pending}
      className='my-4 flex h-10 w-full flex-row items-center justify-center gap-2 rounded-md p-2 text-sm font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200'>
      {icon}
      {label}
    </button>
  )
}
