import Image from 'next/image'
import styles from './Transaction.module.scss'
import Badge from '../Badge/Badge'
import dayjs from 'dayjs'

type TransactionProps = {
  hash: string
  from: string
  to: string
  status: 'success' | 'failed' | 'warning'
  timestamp: number
}
const Transaction: React.FC<TransactionProps> = ({
  hash,
  from,
  to,
  status,
  timestamp,
}) => {
  return (
    <div className={styles['transaction']}>
      <div className={styles['status-bar']}>
        <div className={styles['hash']}>{hash}</div>
        <div className={styles['status']}>
          <Badge text={status} theme={status} />
        </div>
      </div>
      <div className={styles['direction']}>
        <div>{from}</div>
        <Image width={20} height={20} src='/icons/arrow.svg' alt='icon' />
        <div>{to}</div>
      </div>
      <div className={styles['time']}>
        {dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    </div>
  )
}
export default Transaction
