import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

//Close DB connection after x milisecodns of inactivity.
const CLOSE_INACTIVE_CONNECTION = true
const CONNECTION_TIMEOUT = 30 * 60 * 1000 //30 minutes

//Works only in dev env for debuging purposes
let debugListenersInitalized = false
if (process.env.NODE_ENV == "development" && !debugListenersInitalized) {
  mongoose.connection.on("connecting", () => console.log("\x1b[33m[MongoDB]\x1b[36m Status -> Connecting\x1b[0m"))
  mongoose.connection.on("open", () => console.log("\x1b[33m[MongoDB]\x1b[36m Status -> Open\x1b[0m"))
  mongoose.connection.on("reconnected", () => console.log("\x1b[33m[MongoDB]\x1b[36m Status -> Reconnecting\x1b[0m"))
  mongoose.connection.on("disconnecting", () => console.log("\x1b[33m[MongoDB]\x1b[36m Status -> Disconnecting\x1b[0m")) //prettier-ignore
  mongoose.connection.on("close", () => console.log("\x1b[33m[MongoDB]\x1b[36m Status -> Close\x1b[0m"))
  mongoose.connection.on("connected", () => console.log("\x1b[33m[MongoDB]\x1b[36m Status -> Connected\x1b[0m"))
  mongoose.connection.on("disconnected", () => console.log("\x1b[33m[MongoDB]\x1b[36m Status -> Disconnected\x1b[0m"))
  debugListenersInitalized = true
}

const cache: {
  connection: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
  timeout?: NodeJS.Timeout | null
} = {
  connection: null,
  promise: null,
  timeout: null,
}

export const connectToDB = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI not provided as env variable")

  if (cache.timeout) cache.timeout.refresh()
  if (cache.connection) return cache.connection
  if (!cache.promise) cache.promise = mongoose.connect(MONGODB_URI, { dbName: "applikacjeMobilne" })

  if (CLOSE_INACTIVE_CONNECTION) {
    cache.timeout = setTimeout(async () => {
      cache.connection = null
      cache.promise = null
      cache.timeout = null
      console.log("🟨 MongoDB connection closed due to inactivity.")

      await mongoose.disconnect()
    }, CONNECTION_TIMEOUT)
  }

  try {
    cache.connection = await cache.promise
  } catch (e) {
    cache.promise = null
    throw e
  }
}
