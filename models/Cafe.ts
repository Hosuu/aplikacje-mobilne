import { Model, Schema, model, models } from "mongoose"

export interface ICafeSchema extends Document {
  //Required
  _id: string
  name: string
  address: string
  latitude: number
  longitude: number
  //Not required
  description: string
  reviews: string[]
  media: string[]
  tags: string[]
  rating: number
  rank: number
}

export const CafeSchema: Schema = new Schema<ICafeSchema>({
  //Required
  _id: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  //Not required
  description: { type: String },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  rating: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  media: [{ type: String }],
})

const Cafe = (models?.Cafe as Model<ICafeSchema>) || model<ICafeSchema>("Cafe", CafeSchema, "cafes")

export default Cafe
