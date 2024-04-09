import { Model, Schema, model, models } from "mongoose"

interface ICategory extends Document {
  name: string
  description: string
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
})

const Category = (models?.Category as Model<ICategory>) || model<ICategory>("Category", CategorySchema)

export default Category
