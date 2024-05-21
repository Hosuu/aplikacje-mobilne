import mongoose, { Model, Schema, model, models } from "mongoose"

//Done!
interface ITagSchema extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  occurences: number
  description: string
  rainbow: boolean
}

const TagSchema: Schema = new Schema({
  name: { type: String, required: true },
  occurences: { type: Number, default: 0 },
  description: { type: String, required: true },
  rainbow: { type: Boolean, required: true, default: false },
})

const Tag = (models?.Tag as Model<ITagSchema>) || model<ITagSchema>("Tag", TagSchema)

export default Tag
