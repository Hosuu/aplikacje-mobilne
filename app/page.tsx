import { connectToDB } from "@/utils/dbConnect"
import ClientSideComp from "./_clientSideComp"

export default async function Home() {
  await connectToDB()
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>Hello world</div>
      <ClientSideComp />
    </main>
  )
}
