import { Model, Schema, model, models } from "mongoose"

interface ICafeSchema {
  name: string
  gMapsId: string
  description: string
}

const CafeSchema = new Schema<ICafeSchema>({
  name: { type: String },
  gMapsId: { type: String },
  description: { type: String },
})

const Cafe = (models.Cafe as Model<ICafeSchema>) || model<ICafeSchema>("Cafe", CafeSchema, "Cafe")

export default Cafe
