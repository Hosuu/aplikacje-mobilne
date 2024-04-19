import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

import { authConfig } from "./auth.config"
import { connectToDB } from "./lib/dbConnect"
import User from "./models/User"

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          await connectToDB()
          const user = await User.findOne({ email: email })

          if (!user) return null

          // const encoder = new TextEncoder()
          // const saltedPassword = encoder.encode(password + user.salt)
          // const hashedPasswordBuffer = await crypto.subtle.digest("SHA-256", saltedPassword)
          // const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

          // if (hashedPassword === user.password) {
          //   return user
          // } else {
          //   return null
          // }

          return password === user.password ? user : null
        }

        return null
      },
    }),
  ],
})
