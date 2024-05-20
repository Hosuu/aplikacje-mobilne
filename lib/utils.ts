export function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms))
}

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

export function distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadiusKm = 6371
  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)
  lat1 = degreesToRadians(lat1)
  lat2 = degreesToRadians(lat2)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}
