import React from "react";
import styles from "./styles.module.scss";

interface CardWrapperProps {
  title: React.ReactNode;
  onCreate?: () => void;
  createButtonText?: React.ReactNode;
  className?: string;
}

const CardWrapper: React.FC<React.PropsWithChildren<CardWrapperProps>> = ({
  title,
  onCreate,
  createButtonText,
  children,
  className = "",
}) => (
  <div className={`${styles.customCardWrap} ${className}`}>
    <div className={styles.customCardHeader}>
      <h4 className="mb-0">{title}</h4>
      {onCreate && createButtonText && (
        <button className={styles.createButton} onClick={onCreate}>
          {createButtonText}
        </button>
      )}
    </div>
    <div className={styles.customCardBody}>{children}</div>
  </div>
);

export default CardWrapper;
