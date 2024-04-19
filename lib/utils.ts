export function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms))
}

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
