'use client'

import { useTranslations } from 'next-intl'
import styles from './page.module.scss'
import Header from '@/components/Header/Header'
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput'
import { ArrowDownUp } from 'lucide-react'
import clsx from 'clsx'
import ParticlesBackground from '@/components/ParticlesBackground/ParticlesBackground'
import Image from 'next/image'
import BaseButton from '@/components/BaseButton/BaseButton'
import Transaction from '@/components/Transaction/Transaction'
import WalletButton from '@/components/WalletButton/WalletButton'
import { useState } from 'react'

export default function HomePage() {
  const t = useTranslations()

  const [transactions, setTransactions] = useState([])

  return (
    <div className={styles['page']}>
      <WalletButton />
      <ParticlesBackground className={styles['background']} />
      <Header />
      <div className={styles['main']}>
        <h1>{t('Cross-Chain Swap')}</h1>
        <h3>
          {t(
            'Simulate cross-chain token swaps with live Uniswap V3 data and Axelar bridge fee estimates',
          )}
        </h3>
        <div className={clsx(styles['panel'], styles['swap'])}>
          <div className={styles['panel__title']}>{t('Swap Tokens')}</div>
          <CurrencyInput
            amount={1}
            balance={0}
            direction='from'
            currency={'ETH'}
            onAmountChange={() => {}}
            onCurrencyChange={() => {}}
          />
          <ArrowDownUp className={styles['button']} />
          <CurrencyInput
            amount={1}
            balance={0}
            direction='to'
            currency={'USDC'}
            onAmountChange={() => {}}
            onCurrencyChange={() => {}}
          />
          <div className={styles['fee']}>
            <div className={styles['fee__slot']}>
              <Image
                width={20}
                height={20}
                src='/icons/trends.svg'
                alt='icon'
              />
              <div>{t('Bridge Fee')}</div>
              <Image width={20} height={20} src='/icons/arrow.svg' alt='icon' />
              <Image
                className={styles['refresh-button']}
                width={20}
                height={20}
                src='/icons/refresh.svg'
                alt='icon'
              />
            </div>
            <div className={styles['fee__slot']}>
              <div>{t('Gas Fee')}: </div>
              <div></div>
            </div>
            <div className={styles['fee__slot']}>
              <div>{t('USD Equivalent')}: </div>
              <div></div>
            </div>
            <div className={styles['fee__slot']}>
              <Image width={20} height={20} src='/icons/time.svg' alt='icon' />
              <div>{t('Estimated Time')}: </div>
              <div></div>
            </div>
          </div>
          <BaseButton theme='green'>{t('Swap')}</BaseButton>
        </div>
        <div className={clsx(styles['panel'], styles['transactions'])}>
          <div className={styles['panel__title']}>
            <div>{t('Transactions')}</div>
            <Image
              className={styles['refresh-button']}
              width={20}
              height={20}
              alt='icon'
              src='/icons/refresh.svg'
            />
          </div>
          {transactions.map((t) => (
            <Transaction
              key={t}
              address={'address'}
              status='Executed'
              from='Ethereum'
              to='Polygon'
              timestamp='2025/07/21 16:57:32'
            />
          ))}
        </div>
      </div>
    </div>
  )
}
