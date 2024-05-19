import { auth } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  console.log(session)
  if (session != undefined) redirect("/app")

  return (
    <main className='flex min-h-screen flex-col items-center justify-around'>
      <h1 className='text-4xl font-bold'>
        WroKawka <p className='text-sm'>Coś wiecej, niż tylko kawiarnie</p>
      </h1>
      {session === null ? (
        <Link href={"/login"} className='bg-sky-600 hover:bg-sky-800  rounded-full text-center py-2 px-5'>
          Zaloguj
        </Link>
      ) : (
        <div className='flex flex-col gap-2'>
          <p>
            Zalogowano jako: <em>{session?.user?.email}</em>
          </p>
          <Link href={"/logout"} className='bg-sky-600 hover:bg-sky-800 rounded-full text-center py-2 px-5'>
            Wyloguj
          </Link>
        </div>
      )}
    </main>
  )
}
