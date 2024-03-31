import Cafe from "@/models/cafe"
import { connectToDB } from "@/utils/dbConnect"

export default async function Page() {
  await connectToDB()
  const cafes = await Cafe.find()

  return (
    <div>
      {cafes.map((c) => (
        <div key={c.name}>{JSON.stringify(c)}</div>
      ))}
    </div>
  )
}
