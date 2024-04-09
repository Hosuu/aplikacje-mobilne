import { Model, Schema, model, models } from "mongoose"

interface ITagSchema extends Document {
  name: string
  rank: number
  description: string
}

const TagSchema: Schema = new Schema({
  name: { type: String, required: true },
  rank: { type: Number, default: 0 },
  description: { type: String },
})

const Tag = (models?.Tag as Model<ITagSchema>) || model<ITagSchema>("Tag", TagSchema)

export default Tag
