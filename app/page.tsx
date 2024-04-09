import { connectToDB } from "@/utils/dbConnect"
import Link from "next/link"
import ClientSideComp from "./_clientSideComp"

export default async function Home() {
  await connectToDB()
  return (
    <main className='flex min-h-screen flex-col items-center justify-around p-24'>
      <h1 className='text-4xl font-bold'>
        WroKawka <p className='text-sm'>Coś wiecej, niż tylko kawiarnie</p>
      </h1>
      <ClientSideComp />
      <div className='bg-sky-950 text-gray-500 rounded-full text-center py-2 px-5'>
        Login <p>(kiedys bedzie, jak Oauth2 zadziala)</p>
      </div>
      <Link className='bg-sky-600 hover:bg-sky-800 rounded-full text-center py-2 px-5' href={"/api/ranking"}>
        Ranking API endpoint
      </Link>
      <Link className='bg-sky-600 hover:bg-sky-800 rounded-full text-center py-2 px-5' href={"/api/cafe"}>
        Cafe list API endpoint
      </Link>
    </main>
  )
}
