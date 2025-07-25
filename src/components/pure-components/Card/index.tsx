import React from "react";
import styles from "./styles.module.scss";

interface CardProps {
  variant?: string;
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
  const variantClass = `variant${
    variant.charAt(0).toUpperCase() + variant.slice(1)
  }`;

  return (
    <div
      className={`${styles.card} ${styles[variantClass]} ${
        bordered ? styles.bordered : ""
      } ${noShadow ? styles.noShadow : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
