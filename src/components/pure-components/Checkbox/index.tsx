import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';
import styles from './styles.module.scss';

export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
  name?: string;
  value?: string | number;
  inline?: boolean;
  feedback?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label,
    checked,
    disabled,
    onChange,
    className,
    id,
    name,
    value,
    inline,
    feedback,
    isValid,
    isInvalid,
    ...props 
  }, ref) => {
    return (
      <Form.Group className={classNames(styles.checkboxGroup, { [styles.inline]: inline })}>
        <Form.Check
          type="checkbox"
          id={id}
          ref={ref}
          label={label}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className={classNames(styles.checkbox, className)}
          name={name}
          value={value}
          isInvalid={isInvalid}
          isValid={isValid}
          feedback={feedback}
          {...props}
        />
      </Form.Group>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
