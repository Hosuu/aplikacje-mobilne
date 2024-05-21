import { CafeReview } from "@/components/CafeReview"
import { connectToDB } from "@/lib/dbConnect"
import Review, { IReviewSchema } from "@/models/Review"
import User, { IUserSchema } from "@/models/User"

interface pageProps {
  params: { userId: string }
}

export default async function Page({ params }: pageProps) {
  await connectToDB()
  const user = (await User.findById(params.userId).populate({
    path: Review.collection.name,
    select: ["rating", "timeStamp", "text", "score"],
    populate: { path: "cafeId", select: ["name", "_id"] },
  })) as IUserSchema
  if (user === null) return <div> USER NOT FOUND</div>

  const reviews = user.reviews as Pick<IReviewSchema, "rating" | "timeStamp" | "text" | "score" | "cafeId">[]

  return (
    <div className='flex flex-col gap-4 p-4 bg-zinc-950 flex-grow'>
      {reviews.map((r: any) => (
        <CafeReview
          label={r.cafeId!.name}
          url={`/app/cafe/${r.cafeId!._id}`}
          rating={r.rating}
          text={r.text}
          timeStamp={r.timeStamp}
          key={r!._id}
        />
      ))}
    </div>
  )
}
