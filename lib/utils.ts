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

export function automaticRelativeDifference(timeStamp: number): {
  duration: number
  unit: Intl.RelativeTimeFormatUnit
} {
  const diff = -((Date.now() - timeStamp) / 1000) | 0
  const absDiff = Math.abs(diff)

  if (absDiff > 86400 * 30 * 10) {
    return { duration: Math.round(diff / (86400 * 365)), unit: "years" }
  }
  if (absDiff > 86400 * 25) {
    return { duration: Math.round(diff / (86400 * 30)), unit: "months" }
  }
  if (absDiff > 3600 * 21) {
    return { duration: Math.round(diff / 86400), unit: "days" }
  }
  if (absDiff > 60 * 44) {
    return { duration: Math.round(diff / 3600), unit: "hours" }
  }
  if (absDiff > 30) {
    return { duration: Math.round(diff / 60), unit: "minutes" }
  }
  return { duration: diff, unit: "seconds" }
}
