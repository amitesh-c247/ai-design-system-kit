import React from "react";
import { Form } from "react-bootstrap";
import classnames from "classnames";
import styles from "./styles.module.scss";

interface SelectProps {
  className?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  optionGroups?: Array<{
    label: string;
    options: Array<{ value: string; label: string; disabled?: boolean }>;
  }>;
}

const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  className,
  options,
  optionGroups,
  children,
  ...props
}) => {
  return (
    <Form.Select {...props} className={classnames(className, styles.select)}>
      {optionGroups
        ? optionGroups.map((group, index) => (
            <optgroup key={index} label={group.label}>
              {group.options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))
        : options
        ? options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))
        : children}
    </Form.Select>
  );
};

export default Select;
