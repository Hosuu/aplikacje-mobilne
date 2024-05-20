import Link from "next/link"

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-around'>
      <h1 className='text-4xl font-bold'>
        WroKawka <p className='text-sm'>Coś wiecej, niż tylko kawiarnie</p>
      </h1>
      <Link href={"/auth/login"} className='bg-sky-600 hover:bg-sky-800  rounded-full text-center py-2 px-5'>
        Zaloguj
      </Link>
    </main>
  )
}
