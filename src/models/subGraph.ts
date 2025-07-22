export type Token = {
  decimals: string
  symbol: string
}

export type SubGraphPool = {
  pool: {
    poolDayData: {
      volumeUSD: string
    }[]
    totalValueLockedUSD: string
    totalValueLockedToken0: string
    totalValueLockedToken1: string
    feeTier: string
    liquidity: string
    token0Price: string
    token1Price: string
    token0: Token
    token1: Token
  }
}
