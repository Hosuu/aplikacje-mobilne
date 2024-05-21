import mongoose, { Model, Schema, model, models } from "mongoose"
import { ICafeSchema } from "./Cafe"
import { IUserSchema } from "./User"

// DONE!
export interface IReviewSchema extends Document {
  userId: mongoose.PopulatedDoc<IUserSchema>
  cafeId: mongoose.PopulatedDoc<ICafeSchema>
  timeStamp: number
  rating: number
  text: string
  score: number
}

export const ReviewSchema: Schema = new Schema<IReviewSchema>({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  cafeId: { type: String, required: true, ref: "Cafe" },
  timeStamp: { type: Number, required: true, default: Date.now() },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
})

const Review = (models?.Review as Model<IReviewSchema>) || model<IReviewSchema>("Review", ReviewSchema, "reviews")

export default Review
