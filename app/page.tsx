import Link from "next/link"

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-16'>
      <div>
        <h1 className='text-4xl leading-10 font-extrabold'>WroKawka</h1>
        <p className='text-sm leading-5 font-semibold'>Coś wiecej, niż tylko kawiarnie</p>
      </div>
      <Link href={"/auth/login"} className='py-2 px-4 rounded-2xl bg-zinc-100'>
        <p className='text-sm leading-5 font-medium text-zinc-900'>Zaloguj</p>
      </Link>
    </main>
  )
}
