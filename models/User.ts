import mongoose, { Model, Schema, model, models } from "mongoose"
import { ICafeSchema } from "./Cafe"
import { IReviewSchema } from "./Review"

export interface IUserSchema extends Document {
  email: string
  password: string
  username: string
  reviews: mongoose.PopulatedDoc<IReviewSchema>[]
  avgRating: number
  points: number
  rank: number
  visitedCafes: mongoose.PopulatedDoc<ICafeSchema>[]
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  avgRating: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  visitedCafes: [{ type: Schema.Types.ObjectId, ref: "Cafe" }],
})

const User = (models?.User as Model<IUserSchema>) || model<IUserSchema>("User", UserSchema)

export default User
