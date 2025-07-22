export type Transaction = {
  id: string
  // Axelar destination chain command
  command: {
    created_at: {
      ms: number
    }
    blockNumber: number
    chain: string
    executed: boolean
    transactionHash: string
  }
  // Source chain action
  link: {
    denom: string
    destination_chain: string
    source_chain: string
    txhash: string
  }
  send: {
    amount: number
    amount_received: number
    fee: number
    status: 'success' | 'pending' | 'failed' | 'insufficient_fee' | 'dropped'
  }
  type: 'send_token' | 'erc20_transfer' | 'wrap'
}

export type TransactionData = {
  data: Transaction[]
}
