import React from 'react'
import Button from 'react-bootstrap/Button'
import classNames from 'classnames'

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
  <div className="app-switch-group" id={id}>
    {label && <span className="app-switch-label">{label}</span>}
    <Button
      variant="light"
      className={classNames('app-switch-toggle', checked ? 'on' : 'off')}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      size="sm"
    >
      <span className="app-switch-toggle-slider" />
      <span className="app-switch-toggle-text">{checked ? 'YES' : 'NO'}</span>
    </Button>
  </div>
)

export default SwitchButton
