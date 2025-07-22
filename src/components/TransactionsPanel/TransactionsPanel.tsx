'use client'

import clsx from 'clsx'
import Transaction from '../Transaction/Transaction'
import styles from './TransactionsPanel.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { request } from '@/api/request'
import { Transaction as Txn, TransactionData } from '@/models/transaction'
import { openDialog } from '../Dialog/DialogManager'
import { capitalizeFirstLetter } from '@/utils/formatUtils'

const TransactionsPanel: React.FC = () => {
  const t = useTranslations()

  const [transactions, setTransactions] = useState<Txn[]>([])

  const [loading, setLoading] = useState(false)

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true)
      setTransactions([])
      const data = await request<TransactionData>(
        'https://api.axelarscan.io/token/searchTransfers',
        {
          method: 'POST',
          params: {
            fromTime: 0,
            toTime: Math.round(Date.now() / 1000),
            size: 5,
            sourceChain: 'Ethereum',
            destinationChain: 'Polygon',
          },
        },
      )
      console.log(data.data)
      setTransactions(data.data)
    } catch (err) {
      openDialog({
        title: t('Failed to fetch'),
        description: t('Failed to fetch cross-chain transaction histories'),
      })
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  return (
    <div className={clsx(styles['panel'], styles['transactions'])}>
      <div className={styles['panel__title']}>
        <div>{t('Transactions')}</div>
        <Image
          onClick={fetchHistory}
          className={clsx(styles['refresh-button'], {
            [styles['refresh-button--loading']]: loading,
          })}
          width={20}
          height={20}
          alt='icon'
          src='/icons/refresh.svg'
        />
      </div>
      {transactions.map((txn) => (
        <Transaction
          key={txn.id}
          hash={txn.command.transactionHash}
          status={
            txn.command.executed && txn.send.status === 'success'
              ? 'success'
              : !txn.command.executed || txn.send.status === 'failed'
                ? 'failed'
                : 'warning'
          }
          from={capitalizeFirstLetter(txn.link.source_chain)}
          to={capitalizeFirstLetter(txn.link.destination_chain)}
          timestamp={txn.command.created_at.ms}
        />
      ))}
      {transactions.length === 0 && <div>{t('Loading')}</div>}
    </div>
  )
}

export default TransactionsPanel
