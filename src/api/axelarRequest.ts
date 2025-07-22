'use client'

import {
  AxelarQueryAPI,
  Environment,
  EvmChain,
} from '@axelar-network/axelarjs-sdk'
import { formatUnits } from 'ethers'

const api = new AxelarQueryAPI({
  environment: Environment.MAINNET,
})

export const estimateFee = async () => {
  const wei = await api.estimateGasFee(
    EvmChain.ETHEREUM,
    EvmChain.POLYGON,
    '700000',
  )
  return formatUnits(wei.toString(), 18)
}
