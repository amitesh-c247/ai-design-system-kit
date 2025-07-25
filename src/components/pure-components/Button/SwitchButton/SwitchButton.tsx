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
    {label && <span className={styles.switchLabel}>{label}</span>}
    <Button
      variant="light"
      className={`${styles.toggleSwitch} ${checked ? styles.on : styles.off}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      size="sm"
    >
      <span className={styles.slider} />
      <span className={styles.toggleText}>{checked ? 'YES' : 'NO'}</span>
    </Button>
  </div>
)

export default SwitchButton
