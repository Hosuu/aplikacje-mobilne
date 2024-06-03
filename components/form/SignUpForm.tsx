"use client"

import { signUpFormAction } from "@/actions/signUpFormAction"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, type FC } from "react"
import { useFormState } from "react-dom"
import { FormWrapper } from "./elements/FormWrapper"
import { Input } from "./elements/Input"
import { SubmitButton } from "./elements/SubmitButton"

interface SignUpFormProps {}

export const SignUpForm: FC<SignUpFormProps> = () => {
  const router = useRouter()
  const [result, dispatch] = useFormState(signUpFormAction, undefined)

  useEffect(() => {
    if (result && result.finalResult?.settled) {
      if (result.finalResult.state === "SUCCESS")
        setTimeout(
          () => router.push(`/auth/login/new${result._extraData.email ? "?email=" + result._extraData.email : ""}`),
          750
        )
    }
  }, [result, router])

  const label = (
    <div className='mb-3 text-2xl font-bold flex gap-2'>
      <LogIn size={"1.3em"} strokeWidth={3} /> Zarejestruj się
    </div>
  )

  return (
    <div className='flex flex-col items-center w-full'>
      <FormWrapper label={label} result={result} action={dispatch} className='w-96 mt-3'>
        <Input
          label='Nazwa użytkownika'
          type='text'
          id='username'
          name='username'
          required
          placeholder='Wprowadź swoją nazwę użytkownika'
        />

        <Input
          label='Adres e-mail'
          type='email'
          id='email'
          name='email'
          required
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

        <SubmitButton label='Zarejestruj' />
      </FormWrapper>
    </div>
  )
}
