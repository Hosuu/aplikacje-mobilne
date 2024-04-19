import { Model, Schema, model, models } from "mongoose"

interface IUserSchema extends Document {
  email: string
  password: string
  username: string
  reviews: string[]
  points: number
  rank: number
  visitedCafes: string[]
  lastLocation: { timestamp: Date }
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  visitedCafes: [{ type: Schema.Types.ObjectId, ref: "Cafe" }],
  lastLocation: { timestamp: { type: Date, default: Date.now } },
})

const User = (models?.User as Model<IUserSchema>) || model<IUserSchema>("User", UserSchema)

export default User
