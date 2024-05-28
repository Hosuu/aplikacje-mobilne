import { auth } from "@/auth"
import { SignUpForm } from "@/components/form/SignUpForm"
import { Session } from "next-auth"
import { redirect } from "next/navigation"

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect("/app")
  }

  return (
    <main className='flex flex-col p-4'>
      <SignUpForm />
    </main>
  )
}
