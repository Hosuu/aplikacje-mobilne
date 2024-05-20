import { AddCafeReviewForm } from "@/components/AddCafeReviewForm"

interface PageProps {
  params: { cafeId: string }
}

export default async function Page({ params }: PageProps) {
  return (
    <main className='flex flex-col p-4'>
      <AddCafeReviewForm name={"Fauget catering"} place_id={params.cafeId} />
    </main>
  )
}
