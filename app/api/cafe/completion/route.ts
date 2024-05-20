import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const API_KEY = process.env.GMAPS_API_KEY

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}&location=51.110474,17.033298&radius=8000&language=pl&type=cafe`
  )

  const data = await response.json()
  return new Response(JSON.stringify(data.results))
}
