import React from "react";
import { Form } from "react-bootstrap";
import classnames from "classnames";
import type { SelectProps } from "./types";

const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  className,
  options,
  optionGroups,
  children,
  ...props
}) => {
  return (
    <Form.Select {...props} className={className}>
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
