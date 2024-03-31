import { Model, Schema, model, models } from "mongoose"

interface IUserSchema {
  name: string
  email: string
  password: string
}

const CafeSchema = new Schema<IUserSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
})

const User = (models.User as Model<IUserSchema>) || model<IUserSchema>("User", CafeSchema)

export default User
