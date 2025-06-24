import React from 'react'
import Button from 'react-bootstrap/Button'
import styles from './switchButton.module.scss'

interface SwitchButtonProps {
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
  label?: string
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  checked,
  onChange,
  id,
  label,
}) => (
  <div className={styles.switchGroup} id={id}>
    {label && <div className={styles.switchLabel}>{label}</div>}
    <div className={styles.switchButtonWrapper}>
      <Button
        variant={checked ? 'primary' : 'outline-primary'}
        className={`${styles.switchBtn} ${checked ? styles.active : ''}`}
        onClick={() => onChange(true)}
        size="sm"
      >
        YES
      </Button>
      <Button
        variant={!checked ? 'primary' : 'outline-primary'}
        className={`${styles.switchBtn} ${!checked ? styles.active : ''}`}
        onClick={() => onChange(false)}
        size="sm"
      >
        NO
      </Button>
    </div>
  </div>
)

export default SwitchButton
