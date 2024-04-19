"use client"

import { authenticate } from "@/app/(auth)/login/actions"
import { LoaderCircle, LogIn } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FC, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import AuthFormInput from "./AuthFormInput"

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(authenticate, undefined)

  const searchParams = useSearchParams()
  const email = searchParams.get("email") ?? undefined

  useEffect(() => {
    if (result && result.success) setTimeout(() => router.refresh(), 1000)
  }, [result, router])

  return (
    <form action={dispatch} className='flex flex-col items-center gap-4 space-y-3'>
      <div className='w-full flex-1 rounded-lg border  px-6 pb-4 pt-8 shadow-md  md:w-96 bg-white dark:bg-zinc-950 dark:border-zinc-800'>
        <div className='mb-3 text-2xl font-bold flex gap-2'>
          <LogIn size={"1.3em"} strokeWidth={3} />
          Zaloguj się
        </div>
        <AuthFormInput
          type='email'
          name='email'
          required
          defaultValue={email}
          label='Adres e-mail'
          placeholder='Wprowadź swój adres e-mail'
        />
        <AuthFormInput
          type='password'
          minLength={6}
          name='password'
          required
          label='Hasło'
          placeholder='Wprowadź hasło'
        />
        <LoginButton />
        <p className={`text-sm text-center ${result?.success ? "text-green-500" : "text-red-500"}`}>
          {result?.message}
        </p>
      </div>
      <Link href='/signup' className='flex flex-row gap-1 text-sm text-zinc-400'>
        Nie posiadasz konta? <span className='font-semibold underline'>Zarejestruj się</span>
      </Link>
    </form>
  )
}

const LoginButton: FC = () => {
  const { pending } = useFormStatus()

  const icon = pending ? <LoaderCircle className='animate-spin' strokeWidth={2} /> : null
  const label = pending ? <p>Logowanie...</p> : <p>Zaloguj</p>

  return (
    <button className='my-4 flex h-10 w-full flex-row items-center justify-center gap-2 rounded-md bg-zinc-900 p-2 text-sm font-bold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'>
      {icon}
      {label}
    </button>
  )
}
