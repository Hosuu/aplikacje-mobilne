import { auth } from "@/auth"

const API_KEY = process.env.GMAPS_API_KEY

export const GET = auth(async (req) => {
  if (req.auth === null) return new Response("Not authorized", { status: 403 })

  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("query")

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}&location=51.110474,17.033298&radius=8000&language=pl&type=cafe`
  )

  const data = await response.json()
  return new Response(JSON.stringify(data.results))
})
