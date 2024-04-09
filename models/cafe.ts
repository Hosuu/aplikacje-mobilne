import { Model, Schema, model, models } from "mongoose"

interface ICafeSchema extends Document {
  //Required
  name: string
  googleMapsPlaceID: string
  //Not required
  reviews: string[]
  media: string[]
  tags: string[]
  rating: number
  rank: number
}

export const CafeSchema: Schema = new Schema<ICafeSchema>({
  //Required
  name: { type: String, required: true },
  googleMapsPlaceID: { type: String, required: true },
  //Not required
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  rating: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  media: [{ type: String }],
})

const Cafe = (models?.Cafe as Model<ICafeSchema>) || model<ICafeSchema>("Cafe", CafeSchema, "cafes")

export default Cafe
