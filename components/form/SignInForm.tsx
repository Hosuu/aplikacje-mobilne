"use client"

import { signInFormAction } from "@/actions/signInFormAction"
import { LogIn } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, type FC } from "react"
import { useFormState } from "react-dom"
import { FormWrapper } from "./elements/FormWrapper"
import { Input } from "./elements/Input"
import { SubmitButton } from "./elements/SubmitButton"

interface SignInFormProps {}

export const SignInForm: FC<SignInFormProps> = () => {
  const router = useRouter()
  const [result, dispatch] = useFormState(signInFormAction, undefined)

  const searchParams = useSearchParams()
  const redirectEmail = searchParams.get("email") ?? undefined

  useEffect(() => {
    if (result && result.finalResult?.settled) {
      setTimeout(() => router.refresh(), 500)
    }
  }, [result, router])

  const label = (
    <div className='mb-3 text-2xl font-bold flex gap-2'>
      <LogIn size={"1.3em"} strokeWidth={3} /> Zaloguj się
    </div>
  )

  return (
    <div className='flex flex-col items-center w-full'>
      <FormWrapper label={label} result={result} action={dispatch} className='w-96 mt-3'>
        <Input
          label='Adres e-mail'
          type='email'
          id='email'
          name='email'
          required
          defaultValue={redirectEmail}
          placeholder='Wprowadź swój adres e-mail'
        />

        <Input
          label='Hasło'
          type='password'
          id='password'
          name='password'
          required
          minLength={6}
          placeholder='Wprowadź hasło'
        />

        <SubmitButton label='Zaloguj' />
      </FormWrapper>

      <Link href='/auth/signup' className='mt-6 flex flex-row gap-1 text-sm text-center text-zinc-400'>
        Nie posiadasz konta? <span className='font-semibold underline'>Zarejestruj się</span>
      </Link>
    </div>
  )
}
