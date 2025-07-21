'use client'

import styles from './ParticlesBackground.module.scss'
import Particles from 'react-tsparticles'
import { particlesOptions } from './defaultOptions'
import { loadFull } from 'tsparticles'
import clsx from 'clsx'

type ParticlesBackgroundProps = {
  className?: string
}
export default function ParticlesBackground({
  className,
}: ParticlesBackgroundProps) {
  return (
    <div className={clsx(styles['particles-background'], className)}>
      <Particles
        className={styles['particles']}
        options={particlesOptions}
        init={async (main: any) => await loadFull(main)}
        height='100'
        width='100'
      />
    </div>
  )
}
