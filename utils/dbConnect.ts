import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
  if (isConnected) return

  //Temporary for debuging pruposes
  mongoose.connection.on("connectiong", () => console.log("Connecting with database..."))
  mongoose.connection.on("open", () => console.log("open"))
  mongoose.connection.on("reconnected", () => console.log("reconnected"))
  mongoose.connection.on("disconnecting", () => console.log("disconnecting"))
  mongoose.connection.on("close", () => console.log("close"))

  mongoose.connection.on("connected", () => {
    isConnected = true
    console.log("Connected with database ✅")
  })

  mongoose.connection.on("disconnected", () => {
    isConnected = false
    console.log("disconnected")
  })

  try {
    if (typeof process.env.MONGODB_URI != "string") throw new Error("MogoDB uri not provided as env variable")
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "applikacjeMobilne" })
  } catch (error) {
    console.log(error)
  }
}
