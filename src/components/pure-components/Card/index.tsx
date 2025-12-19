import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import classNames from "classnames";

interface CardProps {
  variant?: "default" | "strong" | "tight" | "tight-strong";
  bordered?: boolean;
  noShadow?: boolean;
  className?: string;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  variant = "default",
  bordered = false,
  noShadow = false,
  className = "",
}) => {
  const cardClasses = classNames(
    {
      "bg-secondary": variant === "strong" || variant === "tight-strong",
      "p-4": variant === "default" || variant === "strong",
      "p-3": variant === "tight" || variant === "tight-strong",
      "border": bordered,
      "shadow-sm": !noShadow && (variant === "default" || variant === "tight"),
      "shadow": !noShadow && (variant === "strong" || variant === "tight-strong"),
    },
    className
  );

  return (
    <BootstrapCard className={cardClasses}>
      {children}
    </BootstrapCard>
  );
};

export default Card;
