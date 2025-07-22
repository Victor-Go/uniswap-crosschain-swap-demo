'use client'

import clsx from 'clsx'
import BaseButton from '../BaseButton/BaseButton'
import CurrencyInput from '../CurrencyInput/CurrencyInput'
import styles from './SwapPanel.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { gql } from 'urql'
import { useCallback, useEffect, useState } from 'react'
import theGraphRequest from '@/api/theGraphRequest'
import { SubGraphPool } from '@/models/subGraph'
import { Token } from '@/models/general'
import { formatAmount } from '@/utils/formatUtils'
import { openDialog } from '../Dialog/DialogManager'
import { estimateFee } from '@/api/axelarRequest'
import { formatUnits } from 'ethers'
import { request } from '@/api/request'

const SwapPanel: React.FC = () => {
  const t = useTranslations()

  const [token0, setToken0] = useState<Token>('ETH')
  const [token1, setToken1] = useState<Token>('USDC')

  const [gas, setGas] = useState<string>('0')

  const [token0Amount, setToken0Amount] = useState(0)
  const [token1Amount, setToken1Amount] = useState(0)
  const [lastChanged, setLastChanged] = useState<'token0' | 'token1'>('token0')
  const handleToken0Change = (val: number) => {
    setToken0Amount(val)
    setLastChanged('token0')
  }

  const handleToken1Change = (val: number) => {
    setToken1Amount(val)
    setLastChanged('token1')
  }

  const [poolData, setPoolData] = useState<SubGraphPool>()

  const [loading, setLoading] = useState(false)

  const fetchPool = useCallback(async () => {
    setLoading(true)
    try {
      const result = await theGraphRequest<SubGraphPool>(
        '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV',
        gql`
          {
            pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
              poolDayData(orderBy: date, orderDirection: desc, first: 1) {
                volumeUSD
              }
              totalValueLockedUSD
              totalValueLockedToken0
              totalValueLockedToken1
              feeTier
              liquidity
              token0Price
              token1Price
              token0 {
                symbol
                decimals
              }
              token1 {
                symbol
                decimals
              }
            }
          }
        `,
      )
      setPoolData(result)
    } catch (err) {
      openDialog({
        title: t('Faield to fetch'),
        description: `${t('Failed to fetch on chain details.')}\n ${err}`,
      })
    } finally {
      setLoading(false)
    }
  }, [setLoading, setPoolData, t])

  const fetchGas = useCallback(async () => {
    const res = await estimateFee()
    setGas(res)
  }, [])

  useEffect(() => {
    if (!poolData?.pool.token0Price) return

    if (lastChanged === 'token0') {
      const newValue = token0Amount * Number(poolData.pool.token0Price)
      if (token1Amount !== newValue) {
        setToken1Amount(newValue)
      }
    } else if (lastChanged === 'token1') {
      const newValue = token1Amount / Number(poolData.pool.token0Price)
      if (token0Amount !== newValue) {
        setToken0Amount(newValue)
      }
    }
  }, [token0Amount, token1Amount, lastChanged, poolData])

  useEffect(() => {
    fetchPool()
    fetchGas()
  }, [fetchPool, fetchGas])

  return (
    <div className={clsx(styles['panel'], styles['swap'])}>
      <div className={styles['panel__title']}>{t('Swap Tokens')}</div>
      <CurrencyInput
        disabled={loading}
        amount={token0Amount}
        balance={0}
        network='Ethereum'
        direction='from'
        currency={token0}
        onAmountChange={(value) => handleToken0Change(value)}
      />
      <CurrencyInput
        disabled={loading}
        amount={token1Amount}
        balance={0}
        network='Polygon'
        direction='to'
        currency={token1}
        onAmountChange={(value) => handleToken1Change(value)}
      />
      <div className={styles['details']}>
        <div className={styles['details__slot']}>
          <div className='flex'>
            <Image width={20} height={20} src='/icons/trends.svg' alt='icon' />
            <div className='ml-1'>{t('Bridge Fee')}:&nbsp;</div>
            <div className='font-bold'>{token0}</div>
            <Image width={20} height={20} src='/icons/arrow.svg' alt='icon' />
            <div className='font-bold'>{token1}</div>
          </div>
          <Image
            onClick={fetchPool}
            className={clsx(styles['refresh-button'], {
              [styles['refresh-button--loading']]: loading,
            })}
            width={20}
            height={20}
            src='/icons/refresh.svg'
            alt='icon'
          />
        </div>
        <div className={styles['details__slot']}>
          <div>{t('Fee Tier')}:&nbsp;</div>
          <div>
            {loading
              ? 'Loading'
              : `${Number(poolData?.pool.feeTier || 0) / 10000}%`}
          </div>
        </div>
        <div className={styles['details__slot']}>
          <div>{t('Fee')}:&nbsp;</div>
          <div>
            {loading
              ? 'Loading'
              : `${formatAmount((token0Amount * Number(poolData?.pool.feeTier || 0)) / 1000000, 4)} ${token0}`}
          </div>
        </div>
        <div className={styles['details__slot']}>
          <div>
            {token1} {t('Locked')}:&nbsp;
          </div>
          <div>
            {loading
              ? 'Loading'
              : formatAmount(poolData?.pool.totalValueLockedToken0 || 0)}
          </div>
        </div>
        <div className={styles['details__slot']}>
          <div>
            {token0} {t('Locked')}:&nbsp;
          </div>
          <div>
            {loading
              ? 'Loading'
              : formatAmount(poolData?.pool.totalValueLockedToken1 || 0)}
          </div>
        </div>
        <div className={styles['details__slot']}>
          <div>TVL:&nbsp;</div>
          <div>
            {loading
              ? 'Loading'
              : `$${formatAmount(poolData?.pool.totalValueLockedUSD || 0)}`}
          </div>
        </div>
        <div className={styles['details__slot']}>
          <div>{t('Estimated Gas')}:&nbsp;</div>
          <div>{loading ? 'Loading' : `${formatAmount(gas, 6)} ETH`}</div>
        </div>
        <div className={styles['details__slot']}>
          <div>{t('Volume')}:&nbsp;</div>
          <div>
            {loading
              ? 'Loading'
              : `$${formatAmount(poolData?.pool.poolDayData[0].volumeUSD || 0)}`}
          </div>
        </div>
      </div>
      <BaseButton theme='green'>{t('Swap')}</BaseButton>
    </div>
  )
}
export default SwapPanel
