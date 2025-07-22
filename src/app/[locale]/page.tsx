'use client'

import { useTranslations } from 'next-intl'
import styles from './page.module.scss'
import Header from '@/components/Header/Header'
import ParticlesBackground from '@/components/ParticlesBackground/ParticlesBackground'
import SwapPanel from '@/components/SwapPanel/SwapPanel'
import TransactionsPanel from '@/components/TransactionsPanel/TransactionsPanel'
import LanguageButton from '@/components/LanguageButton/LanguageButton'

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className={styles['page']}>
      <LanguageButton />
      <ParticlesBackground className={styles['background']} />
      <Header />
      <div className={styles['main']}>
        <h1>{t('Cross-Chain Swap')}</h1>
        <h3>
          {t(
            'Simulate cross-chain token swaps with live Uniswap V3 data and Axelar bridge fee estimates',
          )}
        </h3>
        <SwapPanel />
        <TransactionsPanel />
      </div>
    </div>
  )
}
