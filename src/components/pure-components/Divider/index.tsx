import React from "react";
import { Container } from "react-bootstrap";
import classnames from "classnames";
import type { DividerProps } from "./types";
import styles from "./styles.module.scss";

const Divider: React.FC<DividerProps> = ({
  className,
  noMargin,
  vertical,
  variant,
  ...props
}) => {
  return (
    <Container
      fluid
      className={classnames(
        styles.divider,
        {
          [styles.separatorVertical]: vertical,
          [styles.noMargin]: noMargin,
          [styles[variant || ""]]: variant,
        },
        className
      )}
      {...props}
    >
      <hr className={styles.hr} />
    </Container>
  );
};

export default Divider;
