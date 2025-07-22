import React, { useEffect, useRef, useState } from 'react'
import styles from './NumberInput.module.scss'
import clsx from 'clsx'
import { clampValueInt, clampValue } from '@/utils/mathUtils'

const timeout = 100

type Props = {
  integerOnly?: boolean
  value?: number
  onChange?: (v: number) => void
  min?: number
  max?: number
  buttonBackground?: string
  step?: number
  className?: string
  valueClassName?: string
  disabled?: boolean
}
const NumberInput: React.FC<Props> = ({
  integerOnly,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  buttonBackground,
  step = 1,
  className,
  valueClassName,
  disabled,
}) => {
  const [localValue, setLocalValue] = useState(value || 0)
  const valueRef = useRef(localValue)
  useEffect(() => {
    valueRef.current = localValue
  }, [localValue])

  useEffect(() => {
    setLocalValue(value || 0)
  }, [value])

  const [holdInterval, setHoldInterval] = useState<undefined | NodeJS.Timeout>()
  const [holdTimer, setHoldTimer] = useState(0)
  const timerRef = useRef(holdTimer)
  useEffect(() => {
    timerRef.current = holdTimer
  }, [holdTimer])

  const setValue = (value: number) => {
    const clampedValue = integerOnly
      ? clampValueInt(value, min, max)
      : clampValue(value, min, max)
    setLocalValue(clampedValue)
    onChange?.(clampedValue)
  }

  const holdStart = (direction: -1 | 1) => {
    if (disabled) return

    const newValue = localValue + direction * step
    setValue(newValue)

    clearInterval(holdInterval)
    setHoldTimer(0)

    const interval = setInterval(() => {
      const timer = timerRef.current
      setHoldTimer(timer + timeout)

      let multiplier = 0

      if (timer < 250) multiplier = 1
      const level = Math.floor((timer - 250) / 1000)
      multiplier = 10 ** (level + 1)

      const newValue = valueRef.current + direction * multiplier * step
      setValue(newValue)
    }, timeout)
    setHoldInterval(interval)
  }

  const holdEnd = () => {
    clearInterval(holdInterval)
    setHoldInterval(undefined)
  }

  return (
    <div
      className={clsx(
        styles['input'],
        { [styles['input--disabled']]: disabled },
        className,
      )}
      style={
        buttonBackground
          ? ({ '--button-bg': buttonBackground } as React.CSSProperties)
          : undefined
      }
    >
      <button
        className={clsx(styles['input__button'], {
          [styles['input__button--disabled']]: disabled,
        })}
        onMouseDown={() => holdStart(-1)}
        onTouchStart={() => holdStart(-1)}
        onMouseUp={holdEnd}
        onTouchCancel={holdEnd}
      >
        -
      </button>

      <input
        disabled={disabled}
        className={clsx(
          styles['input__field'],
          { [styles['input__field--disabled']]: disabled },
          valueClassName,
        )}
        aria-label='number input'
        value={localValue}
        onChange={(e) => {
          const txt = e.target.value
          const num = Number(txt)
          if (!isNaN(num)) {
            setValue(num)
          }
        }}
        inputMode={integerOnly ? 'numeric' : 'decimal'}
      />

      <button
        className={clsx(styles['input__button'], {
          [styles['input__button--disabled']]: disabled,
        })}
        onMouseDown={() => holdStart(1)}
        onTouchStart={() => holdStart(1)}
        onMouseUp={holdEnd}
        onTouchCancel={holdEnd}
      >
        +
      </button>
    </div>
  )
}

export default NumberInput
