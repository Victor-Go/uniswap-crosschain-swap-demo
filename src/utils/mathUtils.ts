export const clampValueInt = (
  value: number,
  min: number,
  max: number,
): number => {
  const nearest = Math.round(value)
  if (nearest < min) return Math.ceil(min)
  if (nearest > max) return Math.floor(max)
  return nearest
}

export const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}
