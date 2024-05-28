import { AddReviewForm } from "@/components/form/AddReviewForm"
import { connectToDB } from "@/lib/dbConnect"
import Cafe from "@/models/Cafe"
import { redirect } from "next/navigation"

interface PageProps {
  params: { cafeId: string }
}

export default async function Page({ params }: PageProps) {
  await connectToDB()
  const cafe = await Cafe.findById(params.cafeId)
  if (cafe === null) redirect("/")

  return (
    <main className='flex flex-col p-4'>
      <AddReviewForm name={cafe?.name} place_id={cafe?._id} />
    </main>
  )
}
