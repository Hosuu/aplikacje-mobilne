import { auth } from "@/auth"
import { SignInForm } from "@/components/form/SignInForm"
import { Session } from "next-auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect("/app")
  }

  return (
    <main className='flex flex-col p-4'>
      <SignInForm />
    </main>
  )
}
