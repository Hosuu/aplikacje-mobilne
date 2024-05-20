import { Model, Schema, model, models } from "mongoose"

interface ITagSchema extends Document {
  name: string
  occurences: number
  description: string
}

const TagSchema: Schema = new Schema({
  name: { type: String, required: true },
  occurences: { type: Number, default: 0 },
  description: { type: String },
})

const Tag = (models?.Tag as Model<ITagSchema>) || model<ITagSchema>("Tag", TagSchema)

export default Tag
