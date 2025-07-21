import Image from 'next/image'
import styles from './Transaction.module.scss'
import Badge from '../Badge/Badge'

type TransactionProps = {
  address: string
  from: string
  to: string
  status: string
  timestamp: string
}
const Transaction: React.FC<TransactionProps> = ({
  address,
  from,
  to,
  status,
  timestamp,
}) => {
  return (
    <div className={styles['transaction']}>
      <div className={styles['status-bar']}>
        <div className={styles['address']}>{address}</div>
        <div className={styles['status']}>
          <Badge text={status} theme={'success'} />
        </div>
      </div>
      <div className={styles['direction']}>
        <div>{from}</div>
        <Image width={20} height={20} src='/icons/arrow.svg' alt='icon' />
        <div>{to}</div>
      </div>
      <div className={styles['time']}>{timestamp}</div>
    </div>
  )
}
export default Transaction
