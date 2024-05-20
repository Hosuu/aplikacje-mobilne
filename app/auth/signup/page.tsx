import { auth } from "@/auth"
import SignupForm from "@/components/auth/SignupForm"
import { Session } from "next-auth"
import { redirect } from "next/navigation"

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect("/app")
  }

  return (
    <main className='flex flex-col p-4'>
      <SignupForm />
    </main>
  )
}
