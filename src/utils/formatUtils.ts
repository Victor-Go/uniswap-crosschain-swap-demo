export function capitalizeFirstLetter(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatAmount = (
  raw: string | number | bigint,
  decimals: number = 2,
): string => {
  let str = typeof raw === 'bigint' ? raw.toString() : String(raw)

  if (str.includes('e') || str.includes('E')) {
    str = Number(str).toFixed(decimals + 10)
  }

  const [intRaw, decRaw = ''] = str.split('.')
  const intFormatted = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decFormatted = decRaw.padEnd(decimals, '0').slice(0, decimals)
  return decimals > 0 ? `${intFormatted}.${decFormatted}` : intFormatted
}
