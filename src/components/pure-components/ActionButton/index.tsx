import React from "react";
import Button from "react-bootstrap/Button";
import Tooltip from "../Tooltip";

export interface ActionButtonProps {
  title: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: string;
  size?: "sm" | "lg" | undefined;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  icon,
  onClick,
  variant = "primary",
  size,
  tooltip,
  disabled = false,
  className = "",
}) => {
  const btn = (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {icon && <span className={title ? "me-2" : ""}>{icon}</span>}
      {title}
    </Button>
  );

  return tooltip ? <Tooltip title={tooltip}>{btn}</Tooltip> : btn;
};

export default ActionButton;
